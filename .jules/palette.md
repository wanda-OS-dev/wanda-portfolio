## 2024-04-15 - ARIA Labels for 3D Visualizations
**Learning:** Decorative and interactive 3D WebGL scenes rendered with React Three Fiber (`<Canvas>`) lack native DOM semantics. They act as opaque boxes to screen readers, meaning any purely decorative scene must be hidden via `aria-hidden="true"`, and interactive or informative ones need `role="img"` and a descriptive `aria-label` on their wrapping container.
**Action:** When working with Three.js/R3F components in this app, explicitly set `aria-hidden="true"` on wrapper `div`s for background/hero scenes, and add `role="img"` with detailed `aria-label`s for meaningful visualizations (like the AI Reasoning graph).

## 2024-04-16 - Focus Visible Styles for Keyboard Navigation
**Learning:** For clear keyboard navigation accessibility on dark backgrounds (like `--color-black`), interactive elements need strong focus indicators. Using `focus-visible` with a brand color ring ensures visibility without disrupting the mouse user experience.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black rounded-sm` to interactive navigation elements such as Next.js `<Link>` components and buttons on dark backgrounds.
## 2024-04-16 - Focus Parity for Hover Interactions
**Learning:** Complex interactive UI elements (like project cards) often accumulate numerous `group-hover:*` classes to create rich visual effects. Without pairing these with equivalent focus states, keyboard-only and screen reader users experience a disjointed interface where focus is invisible or visually inferior to hover interactions.
**Action:** Always map every `group-hover:*` utility class to a corresponding `group-focus-visible:*` class to ensure total visual parity between mouse and keyboard navigation, specifically on deeply nested or highly stylized cards.
