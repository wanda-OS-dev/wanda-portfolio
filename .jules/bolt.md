## 2025-03-12 - Throttling React Scroll Listeners
**Learning:** React state setters inside unthrottled `scroll` listeners can trigger unnecessary evaluation cycles and degrade scroll performance, particularly when heavy elements (like WebGL canvases) are present on the page. Even if `useState` bails out when the state value is identical, executing the listener callback hundreds of times per second adds main-thread overhead.
**Action:** Always wrap `scroll` event handlers that update state in `requestAnimationFrame` to align state updates with the browser's paint cycle, significantly reducing main-thread blocking time during scroll.

## 2025-03-12 - React Three Fiber Object Instantiation
**Learning:** Passing instantiated Three.js objects (like `new THREE.Color('#0a0a0a')`) inline as props to R3F components causes the object to be recreated on every render of the component.
**Action:** Hoist these static instances outside the component function or wrap them in `useMemo` to prevent unnecessary garbage collection and object recreation.
