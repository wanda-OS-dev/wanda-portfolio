## 2026-03-13 - Next.js Scroll Listener Thrashing
**Learning:** Next.js applications using global window scroll events without throttling can trigger rapid re-renders on the main thread, leading to layout thrashing. Even if state updates are batched, firing `setScrolled` continuously on every pixel scrolled is an anti-pattern.
**Action:** Always throttle scroll event listeners using `requestAnimationFrame` with a `ticking` flag in `useEffect` hooks to ensure state updates only happen once per frame.
