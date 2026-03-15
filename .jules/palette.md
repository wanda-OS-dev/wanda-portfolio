## 2024-05-18 - Full-screen Mobile Menu Accessibility
**Learning:** Full-screen mobile menus should be treated as modal dialogs to prevent screen readers from reading background content while the menu is open.
**Action:** When implementing full-screen overlay menus, always add `role="dialog"`, `aria-modal="true"`, an appropriate `aria-label`, and ensure the menu can be closed via the `Escape` key. Also, explicitly link the trigger button to the menu using `aria-controls` and communicate its state with `aria-expanded`.
