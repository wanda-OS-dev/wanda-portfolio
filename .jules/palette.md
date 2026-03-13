## 2025-03-13 - Add aria-hidden to pure decorative SVGs
**Learning:** Decorative SVG elements (like arrows next to link text or checkmarks in confirmation dialogs) are often read by screen readers unnecessarily, degrading the user experience by adding clutter without meaningful content.
**Action:** When working on links or buttons that include both text and an icon, add `aria-hidden="true"` to the SVG if the icon is purely decorative.
