## 2024-04-15 - ARIA Labels for 3D Visualizations
**Learning:** Decorative and interactive 3D WebGL scenes rendered with React Three Fiber (`<Canvas>`) lack native DOM semantics. They act as opaque boxes to screen readers, meaning any purely decorative scene must be hidden via `aria-hidden="true"`, and interactive or informative ones need `role="img"` and a descriptive `aria-label` on their wrapping container.
**Action:** When working with Three.js/R3F components in this app, explicitly set `aria-hidden="true"` on wrapper `div`s for background/hero scenes, and add `role="img"` with detailed `aria-label`s for meaningful visualizations (like the AI Reasoning graph).

## 2024-04-16 - Focus Visible Styles for Keyboard Navigation
**Learning:** For clear keyboard navigation accessibility on dark backgrounds (like `--color-black`), interactive elements need strong focus indicators. Using `focus-visible` with a brand color ring ensures visibility without disrupting the mouse user experience.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black rounded-sm` to interactive navigation elements such as Next.js `<Link>` components and buttons on dark backgrounds.

## 2024-05-20 - Adding focus-visible states to group-hover interactions
**Learning:** For keyboard users, complex interactive elements (like cards or links) that rely on `group-hover:*` utility classes lack visual feedback parity. Keyboard users won't see these subtle hover effects like translations or opacity changes unless `group-focus-visible:*` equivalents are also added.
**Action:** Always pair Tailwind `group-hover:*` utility classes with their equivalent `group-focus-visible:*` classes on interactive navigation elements.
