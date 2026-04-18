## 2024-04-15 - ARIA Labels for 3D Visualizations
**Learning:** Decorative and interactive 3D WebGL scenes rendered with React Three Fiber (`<Canvas>`) lack native DOM semantics. They act as opaque boxes to screen readers, meaning any purely decorative scene must be hidden via `aria-hidden="true"`, and interactive or informative ones need `role="img"` and a descriptive `aria-label` on their wrapping container.
**Action:** When working with Three.js/R3F components in this app, explicitly set `aria-hidden="true"` on wrapper `div`s for background/hero scenes, and add `role="img"` with detailed `aria-label`s for meaningful visualizations (like the AI Reasoning graph).

## 2024-04-16 - Focus Visible Styles for Keyboard Navigation
**Learning:** For clear keyboard navigation accessibility on dark backgrounds (like `--color-black`), interactive elements need strong focus indicators. Using `focus-visible` with a brand color ring ensures visibility without disrupting the mouse user experience.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black rounded-sm` to interactive navigation elements such as Next.js `<Link>` components and buttons on dark backgrounds.

## 2024-04-18 - Apply Focus Styles Consistently Across All Links
**Learning:** Even if the site implements `focus-visible` styles in global components like `<Nav>`, inline links or CTAs constructed manually in page layouts (like `<Link href="...">` across the Home page) can easily omit them, rendering keyboard navigation inconsistent and confusing for users relying on visual cues.
**Action:** Always ensure that manually constructed interactive elements, such as inline Next.js `<Link>` components, receive standard `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black` Tailwind utilities to maintain an accessible, universal focus indicator throughout the site.
