import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting (in-memory, resets on cold start — use Upstash Redis for production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

// Helper to escape HTML and prevent XSS/HTML Injection in emails
function escapeHtml(unsafe: unknown): string {
  const str = typeof unsafe === 'string' ? unsafe : String(unsafe ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const limit = 5;
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
  // Extract real IP correctly to prevent rate limit spoofing via X-Forwarded-For
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = req.ip ?? (forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown');

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    // Fail securely without exposing internal error details
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { name, email, message } = body ?? {};

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'All fields must be strings.' }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Input length limits to prevent DoS/memory exhaustion
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'Input exceeds length limits.' }, { status: 400 });
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
