## 2024-05-24 - Nodemailer HTML Injection Vulnerability
**Vulnerability:** Unsanitized user inputs (`name`, `email`, `message`) were interpolated directly into the `html` payload configuration of `transporter.sendMail()` in the `/api/contact` route.
**Learning:** `nodemailer` does NOT automatically escape or sanitize variables injected into the HTML body. It implicitly trusts the provided HTML string, meaning an attacker could craft malicious input (like `<script>alert(1)</script>`) that would execute in the victim's email client if they view HTML emails.
**Prevention:** Always manually escape HTML entities (`&`, `<`, `>`, `"`, `'`) for any user-controlled variable before embedding it in an HTML string sent via `nodemailer`.
