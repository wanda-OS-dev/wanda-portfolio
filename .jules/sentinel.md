## 2024-05-24 - Nodemailer HTML Injection Vulnerability
**Vulnerability:** Unsanitized user inputs (`name`, `email`, `message`) were interpolated directly into the `html` payload configuration of `transporter.sendMail()` in the `/api/contact` route.
**Learning:** `nodemailer` does NOT automatically escape or sanitize variables injected into the HTML body. It implicitly trusts the provided HTML string, meaning an attacker could craft malicious input (like `<script>alert(1)</script>`) that would execute in the victim's email client if they view HTML emails.
**Prevention:** Always manually escape HTML entities (`&`, `<`, `>`, `"`, `'`) for any user-controlled variable before embedding it in an HTML string sent via `nodemailer`.
## 2024-03-24 - Rate Limiting DoS Vulnerability
**Vulnerability:** The in-memory rate limiter `requestCounts` in `src/app/api/contact/route.ts` was an unbounded Map, allowing attackers to continuously append entries with spoofed IPs, resulting in infinite memory growth and eventually a Denial of Service (DoS).
**Learning:** Native `Map` implementations for rate-limiting will crash node.js processes if they lack TTL cleanup or size boundaries.
**Prevention:** Always bound in-memory Maps with a soft limit (to trigger cleanup of expired entries) and a hard limit (to clear or reset the map immediately to protect server stability).
2025-03-01 - When mitigating IP spoofing vulnerabilities in Next.js API rate limiting, prioritize \`req.ip\` (which is securely populated by Vercel/Next.js using internal headers) over user-controllable headers like \`x-forwarded-for\` to prevent trivial bypasses.
