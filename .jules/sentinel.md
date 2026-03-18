## 2024-05-20 - [HTML Injection in Nodemailer]
**Vulnerability:** Unsanitized user inputs (`name`, `email`, `message`) were being directly interpolated into the HTML body of emails sent via `nodemailer`.
**Learning:** `nodemailer` does not automatically sanitize user-controlled variables in HTML email bodies, leading to potential HTML injection or Cross-Site Scripting (XSS) if the receiving email client executes scripts or renders malicious HTML.
**Prevention:** Always manually escape or sanitize user-controlled inputs before injecting them into HTML contexts, even when using well-known libraries like `nodemailer`. Create and use a local `escapeHtml` helper.
