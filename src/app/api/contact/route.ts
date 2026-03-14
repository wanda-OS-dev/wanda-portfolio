import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting (in-memory, resets on cold start — use Upstash Redis for production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

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
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Security: Input length limits (DoS prevention)
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Security: HTML sanitization to prevent XSS in email clients
  const escapeHtml = (unsafe: string) => unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

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
        subject: `New message from ${safeName}`,
        text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
        html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage.replace(/\n/g, '<br/>')}</p>`,
      });
    } catch (err) {
      console.error('[contact] email send failed:', err);
      return NextResponse.json({ error: 'Failed to send. Please email directly.' }, { status: 500 });
    }
  } else {
    // No SMTP configured — log for development
    console.log('[contact] New message:', { name: safeName, email: safeEmail, message: safeMessage.slice(0, 100) });
  }

  return NextResponse.json({ ok: true });
}
