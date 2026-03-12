## 2026-03-12 - [Nav ARIA attributes]
**Learning:** `aria-current` needs to be placed on the interactive element (`<Link>`), not on a decorative child element (`<span>`).
**Action:** When adding accessibility attributes to a link with complex inner DOM, ensure the ARIA attribute is on the `<a>` or `<Link>` element itself.
