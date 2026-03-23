
## 2025-03-22 - Next.js Form Accessibility & ARIA Live Regions
**Learning:** When using state-driven form messages (success/error states) in Next.js applications, standard React updates are not inherently announced to screen readers. For accessible required fields, appending a visually distinct indicator using `aria-hidden="true"` effectively provides visual feedback without cluttering screen reader announcements, since the `required` HTML attribute already conveys the semantics.
**Action:** Consistently use `aria-live="polite"` for success states and `role="alert" aria-live="assertive"` for error messages. For required form fields, pair standard HTML5 validation attributes with `aria-hidden="true"` visual indicators to balance design requirements with accessibility best practices.

## 2025-03-22 - Managing aria-current and mobile menu bindings in custom Next.js navigations
**Learning:** In custom Next.js navigations using `next/link` and state-driven mobile menus, screen readers do not automatically infer the active page or the relationship between a hamburger button and its expanded menu. Active states indicated only by CSS classes (e.g., text-brand-gold) are invisible to assistive technologies.
**Action:** Always add `aria-current="page"` conditionally based on the `usePathname()` hook to explicitly mark the active link for screen readers. Furthermore, tightly couple custom mobile menu toggle buttons with their associated menus using `aria-expanded={isOpen}` and `aria-controls="menu-id"` to provide clear semantic context.
