
## 2025-03-22 - Next.js Form Accessibility & ARIA Live Regions
**Learning:** When using state-driven form messages (success/error states) in Next.js applications, standard React updates are not inherently announced to screen readers. For accessible required fields, appending a visually distinct indicator using `aria-hidden="true"` effectively provides visual feedback without cluttering screen reader announcements, since the `required` HTML attribute already conveys the semantics.
**Action:** Consistently use `aria-live="polite"` for success states and `role="alert" aria-live="assertive"` for error messages. For required form fields, pair standard HTML5 validation attributes with `aria-hidden="true"` visual indicators to balance design requirements with accessibility best practices.

## 2025-02-17 - Micro-UX: Contact Form Loading Spinner
**Learning:** Immediate visual feedback (e.g., a loading spinner) during asynchronous form submissions is crucial to reassure users and prevent duplicate submissions. When implementing spinners on buttons, maintaining standard layout patterns (e.g., flexbox centering) ensures the new element integrates smoothly without shifting surrounding content.
**Action:** When adding asynchronous tasks, always ensure button components use `flex items-center justify-center gap-2` alongside the spinner SVG for consistent alignment, rather than abruptly swapping out the button text or relying on CSS that breaks layout.
