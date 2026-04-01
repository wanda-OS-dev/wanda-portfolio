
## 2025-03-22 - Next.js Form Accessibility & ARIA Live Regions
**Learning:** When using state-driven form messages (success/error states) in Next.js applications, standard React updates are not inherently announced to screen readers. For accessible required fields, appending a visually distinct indicator using `aria-hidden="true"` effectively provides visual feedback without cluttering screen reader announcements, since the `required` HTML attribute already conveys the semantics.
**Action:** Consistently use `aria-live="polite"` for success states and `role="alert" aria-live="assertive"` for error messages. For required form fields, pair standard HTML5 validation attributes with `aria-hidden="true"` visual indicators to balance design requirements with accessibility best practices.
## 2025-03-24 - Accessible Navigation State Management
**Learning:** For Next.js client components using framer-motion and next/link, `aria-current="page"` must be explicitly managed via `usePathname` for both desktop and mobile menus, and the hamburger toggle needs `aria-expanded` and `aria-controls` firmly linking it to the menu container `id`.
**Action:** When creating or modifying interactive navigation components, always explicitly pass ARIA state attributes alongside dynamic class names to ensure screen readers receive the same state cues as sighted users.
## 2025-03-24 - Added aria-hidden="true" to decorative icons
**Learning:** Purely decorative SVG icons (like arrows or checkmarks used for visual styling next to text) create noise for screen readers. While Next.js `next/link` provides the semantic context for navigation, the SVG graphics within them do not add semantic value.
**Action:** Always add `aria-hidden="true"` to `<svg>` elements that are used purely for decorative purposes or visual reinforcement of text that already conveys the meaning.
\n## 2025-03-24 - Accessible Modal and Navigation Menus\n**Learning:** When creating full-screen navigation menus or modals on mobile, screen reader users can get trapped outside the content, and keyboard users need an intuitive way to exit. Furthermore, locking the body scroll prevents the underlying page from scrolling while the menu is open.\n**Action:** Always add an `Escape` key listener to close full-screen menus and use `document.body.style.overflow = "hidden"` to prevent background scrolling when the menu is active.

## 2026-03-26 - Added Visual Feedback for Async Form Submission
**Learning:** During form submission, relying exclusively on text changes (e.g., 'Sending...') might lack sufficient contrast or visual weight to instantly assure the user that action is underway. Incorporating motion via a loading spinner enhances perceived performance and confidence.
**Action:** When implementing async actions that disable the primary button, always include a standard animated loading indicator alongside or replacing the button text to provide immediate visual feedback.

## 2024-05-20 - Adding Accessible Dialog Semantics to Full-Screen Menus
**Learning:** Full-screen mobile menus implemented as fixed position overlays need `role="dialog"` and `aria-modal="true"` to ensure screen readers correctly interpret them as modal dialogues that isolate focus and trap interactions from the underlying page content.
**Action:** When creating new full-screen navigation modals or overlays, always ensure `role="dialog"` and `aria-modal="true"` are applied directly to the main container wrapper element.

## 2025-03-28 - Enhancing User Agency in Success States and Copy Actions
**Learning:** In contexts with single-action workflows (like a form submission or copying a contact detail), users benefit significantly from extended agency post-action. When a success state replaces a form, users are often dead-ended without reloading. Additionally, users often struggle with highlighting and copying text elements like emails accurately.
**Action:** When implementing success states that replace interaction areas, always provide a clear, styled action (e.g., "Send another message") to reset the state. For non-link contact details (like emails), provide an accessible, one-click "Copy to clipboard" button accompanied by temporary visual feedback and an `aria-live` region announcement for screen readers.

## 2025-04-03 - Form AutoComplete and Keyboard Accessibility
**Learning:** Basic form inputs and interactive elements often lack clear focus states and cognitive ease. Without `autoComplete` attributes, users must manually type their information. Without explicit `focus-visible` states (especially when defaults are removed), keyboard users cannot tell which element is active.
**Action:** Always include appropriate `autoComplete` attributes (e.g., `autoComplete="name"`, `autoComplete="email"`) on standard HTML form fields to reduce friction. Ensure all interactive elements—including links, buttons, inputs, and textareas—have robust `focus-visible` styling (such as rings with offsets) to support keyboard accessibility and WCAG contrast guidelines.
