## 2024-05-24 - Nodemailer HTML Injection Vulnerability
**Vulnerability:** Unsanitized user inputs (`name`, `email`, `message`) were interpolated directly into the `html` payload configuration of `transporter.sendMail()` in the `/api/contact` route.
**Learning:** `nodemailer` does NOT automatically escape or sanitize variables injected into the HTML body. It implicitly trusts the provided HTML string, meaning an attacker could craft malicious input (like `<script>alert(1)</script>`) that would execute in the victim's email client if they view HTML emails.
**Prevention:** Always manually escape HTML entities (`&`, `<`, `>`, `"`, `'`) for any user-controlled variable before embedding it in an HTML string sent via `nodemailer`.

## 2025-02-21 - Rate Limit Bypass via X-Forwarded-For Spoofing
**Vulnerability:** The rate limiter in `/api/contact` used the entire raw `x-forwarded-for` string to identify unique clients (`const ip = req.headers.get('x-forwarded-for') ?? 'unknown';`).
**Learning:** An attacker could bypass the 5-requests-per-minute limit by constantly changing the `x-forwarded-for` header in their HTTP requests, thus appearing as a new user for every hit. The entire string is user-controllable.
**Prevention:** To reliably track clients, always prioritize `req.ip` if available in the environment (e.g. Vercel edge/middleware proxy). If falling back to `x-forwarded-for`, strictly parse and extract the very first IP in the comma-separated list, as this is the original client IP appended by the trusted load balancer.
