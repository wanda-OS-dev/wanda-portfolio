## 2024-04-15 - ARIA Labels for 3D Visualizations
**Learning:** Decorative and interactive 3D WebGL scenes rendered with React Three Fiber (`<Canvas>`) lack native DOM semantics. They act as opaque boxes to screen readers, meaning any purely decorative scene must be hidden via `aria-hidden="true"`, and interactive or informative ones need `role="img"` and a descriptive `aria-label` on their wrapping container.
**Action:** When working with Three.js/R3F components in this app, explicitly set `aria-hidden="true"` on wrapper `div`s for background/hero scenes, and add `role="img"` with detailed `aria-label`s for meaningful visualizations (like the AI Reasoning graph).

## 2024-04-16 - Focus Visible Styles for Keyboard Navigation
**Learning:** For clear keyboard navigation accessibility on dark backgrounds (like `--color-black`), interactive elements need strong focus indicators. Using `focus-visible` with a brand color ring ensures visibility without disrupting the mouse user experience.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black rounded-sm` to interactive navigation elements such as Next.js `<Link>` components and buttons on dark backgrounds.

## 2024-04-24 - Visual Parity for Complex Interactive Components
**Learning:** When using Tailwind's `group-hover:*` utility classes to create visual effects on complex interactive components (like cards wrapped in `<Link>`), keyboard users navigating via Tab do not see these visual changes. Relying solely on a base `focus-visible` outline is often insufficient to communicate the rich interactive state intended for the component.
**Action:** Always ensure visual feedback parity for keyboard users on complex interactive elements by pairing `group-hover:*` utility classes with their equivalent `group-focus-visible:*` classes (e.g., `group-hover:opacity-100 group-focus-visible:opacity-100`).
