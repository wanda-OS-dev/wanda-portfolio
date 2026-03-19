## 2024-05-18 - Missing HTML Escaping in Nodemailer `html` bodies

**Vulnerability:** Found an HTML Injection/XSS vulnerability in `src/app/api/contact/route.ts` where unsanitized user inputs (`name`, `email`, `message`) were directly interpolated into the `html` string sent via `nodemailer`.
**Learning:** `nodemailer` does not automatically sanitize inputs when passed to the `html` property. Any user input included in the `html` body must be manually escaped to prevent XSS attacks against the email recipient.
**Prevention:** Always use a local `escapeHtml` helper function (or a library) to sanitize user-controlled variables before interpolating them into HTML email bodies in `nodemailer`.
