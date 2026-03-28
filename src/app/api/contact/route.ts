import { escapeHtml } from "../../../lib/validation";
import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting (in-memory, resets on cold start — use Upstash Redis for production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = Date.now();

// Helper to escape HTML and prevent XSS/HTML Injection in emails

async function rateLimit(ip: string): Promise<boolean> {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const limit = 5;

  // Upstash Redis distributed rate limiting (Production)
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      // Use Upstash REST API to increment a counter
      const key = `rate-limit:${ip}`;
      const url = `${redisUrl}/pipeline`;

      const payload = [
        ["INCR", key],
        ["EXPIRE", key, 60] // Expire in 60 seconds
      ];

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${redisToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        // data looks like [{"result": 1}, {"result": 1}]
        if (Array.isArray(data) && data[0] && typeof data[0].result === 'number') {
          const count = data[0].result;
          return count <= limit;
        }
      } else {
         console.warn('[contact] Upstash rate limit pipeline returned non-ok status:', response.status);
      }
    } catch (err) {
      console.error('[contact] Upstash rate limiting failed, falling back to in-memory:', err);
    }
  }

  // Fallback: Simple rate limiting (in-memory, resets on cold start)
  // Prevent memory leaks / DoS by bounding the Map
  if (requestCounts.size >= 5000) {
    requestCounts.clear(); // Hard limit
    lastCleanup = now;
  } else if (requestCounts.size >= 1000 && now - lastCleanup > 10_000) {
    // Soft limit: Cleanup expired entries at most once every 10 seconds
    // This prevents an O(N) loop on every request when the map is large
    lastCleanup = now;
    for (const [key, value] of requestCounts.entries()) {
      if (value.resetAt < now) {
        requestCounts.delete(key);
      }
    }
  }

  const entry = requestCounts.get(ip);
  if (!entry || entry.resetAt < now) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Extract real IP securely by prioritizing x-forwarded-for header
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (!(await rateLimit(ip))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }
  const { name, email, message } = body ?? {};

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'All fields must be strings.' }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Input length limits to prevent DoS/memory issues
  if (name.length > 100 || email.length > 255 || message.length > 5000) {
    return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // In production: send via nodemailer, Resend, or Postmark
  // For now: log and return success (configure SMTP_* env vars to enable sending)
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'wanda.devops@gmail.com';

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"WandaSystems Contact" <${SMTP_USER}>`,
        to: CONTACT_EMAIL,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      });
    } catch (err) {
      console.error('[contact] email send failed:', err);
      return NextResponse.json({ error: 'Failed to send. Please email directly.' }, { status: 500 });
    }
  } else {
    // No SMTP configured — log for development
    console.log('[contact] New message:', { name, email, message: message.slice(0, 100) });
  }

  return NextResponse.json({ ok: true });
}
