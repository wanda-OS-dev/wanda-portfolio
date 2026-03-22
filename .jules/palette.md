
## 2025-03-22 - Next.js Form Accessibility & ARIA Live Regions
**Learning:** When using state-driven form messages (success/error states) in Next.js applications, standard React updates are not inherently announced to screen readers. For accessible required fields, appending a visually distinct indicator using `aria-hidden="true"` effectively provides visual feedback without cluttering screen reader announcements, since the `required` HTML attribute already conveys the semantics.
**Action:** Consistently use `aria-live="polite"` for success states and `role="alert" aria-live="assertive"` for error messages. For required form fields, pair standard HTML5 validation attributes with `aria-hidden="true"` visual indicators to balance design requirements with accessibility best practices.
