## 2024-05-24 - Nodemailer HTML Injection Vulnerability
**Vulnerability:** Unsanitized user inputs (`name`, `email`, `message`) were interpolated directly into the `html` payload configuration of `transporter.sendMail()` in the `/api/contact` route.
**Learning:** `nodemailer` does NOT automatically escape or sanitize variables injected into the HTML body. It implicitly trusts the provided HTML string, meaning an attacker could craft malicious input (like `<script>alert(1)</script>`) that would execute in the victim's email client if they view HTML emails.
**Prevention:** Always manually escape HTML entities (`&`, `<`, `>`, `"`, `'`) for any user-controlled variable before embedding it in an HTML string sent via `nodemailer`.

## 2026-03-24 - Unbounded Map Memory Leak (DoS Risk)
**Vulnerability:** The `requestCounts` Map used for in-memory rate limiting in `/api/contact` grew indefinitely as new IP addresses connected, creating an Out-of-Memory (OOM) Denial of Service (DoS) vulnerability.
**Learning:** Unbounded data structures (like `Map` or arrays) used to store per-request or per-IP state must always have eviction logic or size limits, otherwise an attacker can spoof IPs to exhaust server memory.
**Prevention:** Implement a soft limit that triggers cleanup of expired entries, and a hard cap that forcefully clears or rejects entries if memory exhaustion is imminent. Better yet, use a dedicated key-value store with TTLs (e.g., Redis) for rate limiting in production.
