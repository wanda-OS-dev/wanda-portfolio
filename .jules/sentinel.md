## 2026-03-17 - [HTML Injection in Contact Form Emails]
**Vulnerability:** The contact form API route (`src/app/api/contact/route.ts`) constructs an HTML email body using `nodemailer` by directly interpolating user input (`name`, `email`, `message`) without sanitization or HTML escaping. This allowed HTML injection (a form of XSS contextually within the email client).
**Learning:** `nodemailer` does not automatically sanitize HTML bodies. When including user-controlled variables in HTML email bodies via `nodemailer`, manual escaping is necessary.
**Prevention:** Always implement an HTML escaping function (e.g., escaping `&`, `<`, `>`, `"`, `'`) for any user-provided data before interpolating it into HTML email bodies.
