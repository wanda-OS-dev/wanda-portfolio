## 2024-05-20 - Mobile Menu Body Scroll Lock and ARIA
**Learning:** Full-screen mobile menus without body scroll locking lead to frustrating background scrolling, and hamburger buttons require explicit `aria-expanded` and `aria-controls` for screen reader context.
**Action:** Always implement body scroll locking for full-screen overlays and explicitly link trigger buttons to their target containers via ARIA attributes.
