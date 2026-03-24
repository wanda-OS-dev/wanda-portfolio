
## 2025-03-22 - Next.js Form Accessibility & ARIA Live Regions
**Learning:** When using state-driven form messages (success/error states) in Next.js applications, standard React updates are not inherently announced to screen readers. For accessible required fields, appending a visually distinct indicator using `aria-hidden="true"` effectively provides visual feedback without cluttering screen reader announcements, since the `required` HTML attribute already conveys the semantics.
**Action:** Consistently use `aria-live="polite"` for success states and `role="alert" aria-live="assertive"` for error messages. For required form fields, pair standard HTML5 validation attributes with `aria-hidden="true"` visual indicators to balance design requirements with accessibility best practices.

## 2024-03-24 - Navigation & Mobile Menu Accessibility
**Learning:** In Next.js navigation components, applying active CSS classes alone to denote the current page is insufficient for screen readers. Furthermore, custom mobile menus (like the one implemented with Framer Motion) require the toggle button to be tightly coupled to its menu container using `aria-expanded` and `aria-controls` for proper screen reader navigation.
**Action:** When building custom Next.js navigation components using `next/link`, always conditionally apply `aria-current="page"` using the `usePathname()` hook. Ensure the hamburger toggle button is tightly coupled to the menu container by applying `aria-expanded={isOpen}` and `aria-controls="menu-id"`.
