## 2024-05-24 - Nodemailer HTML Injection Vulnerability
**Vulnerability:** Unsanitized user inputs (`name`, `email`, `message`) were interpolated directly into the `html` payload configuration of `transporter.sendMail()` in the `/api/contact` route.
**Learning:** `nodemailer` does NOT automatically escape or sanitize variables injected into the HTML body. It implicitly trusts the provided HTML string, meaning an attacker could craft malicious input (like `<script>alert(1)</script>`) that would execute in the victim's email client if they view HTML emails.
**Prevention:** Always manually escape HTML entities (`&`, `<`, `>`, `"`, `'`) for any user-controlled variable before embedding it in an HTML string sent via `nodemailer`.
## 2024-03-24 - Rate Limiting DoS Vulnerability
**Vulnerability:** The in-memory rate limiter `requestCounts` in `src/app/api/contact/route.ts` was an unbounded Map, allowing attackers to continuously append entries with spoofed IPs, resulting in infinite memory growth and eventually a Denial of Service (DoS).
**Learning:** Native `Map` implementations for rate-limiting will crash node.js processes if they lack TTL cleanup or size boundaries.
**Prevention:** Always bound in-memory Maps with a soft limit (to trigger cleanup of expired entries) and a hard limit (to clear or reset the map immediately to protect server stability).
## 2025-05-27 - [IP Spoofing via X-Forwarded-For in Rate Limiter]
**Vulnerability:** The rate limiter in the `src/app/api/contact/route.ts` API route prioritized the `x-forwarded-for` header without falling back or initially checking the platform-verified `req.ip`.
**Learning:** `x-forwarded-for` can easily be manipulated by an attacker to bypass rate limits by submitting requests with a forged header.
**Prevention:** To prevent rate limit spoofing in Next.js API routes, do not blindly trust the `x-forwarded-for` header. Extract the real IP securely by prioritizing `req.ip` and falling back to the first cleanly trimmed IP in the `x-forwarded-for` list: `req.ip ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim()`.
## 2025-05-28 - [Sensitive Information Leakage via console.error]
**Vulnerability:** The API route `src/app/api/contact/route.ts` used raw `console.error` and `console.warn` calls to log errors, such as SMTP configuration failures or rate-limiting issues.
**Learning:** Raw `console.error` statements in server environments can inadvertently leak sensitive stack traces or internal configuration details to external log monitoring systems, especially if error objects are passed directly.
**Prevention:** Always use a centralized logging utility (e.g., `logger.error` which sanitizes error objects) instead of native `console` methods for production-facing server routes.
