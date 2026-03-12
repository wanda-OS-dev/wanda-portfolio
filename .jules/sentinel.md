## 2024-05-19 - [HTML Injection in Contact Email]
**Vulnerability:** User inputs (name, email, message) were directly interpolated into HTML without escaping when sending emails via the contact form. This could allow malicious users to inject HTML or scripts that execute in the recipient's email client (XSS/HTML injection).
**Learning:** Even though the frontend sanitizes input or the backend logs it, data passed to `nodemailer` (or similar email libraries) within the `html` field is interpreted as HTML by the receiving email client. Direct interpolation is dangerous.
**Prevention:** Always escape user input before using it in HTML generation for emails. Implement an `escapeHtml` function or use a templating library that auto-escapes output.
