## 2025-01-01 - Initial Setup
**Learning:** Just starting out.
**Action:** None.

## 2025-02-17 - Redundant array allocations during Framer Motion renders
**Learning:** In React components that combine static arrays (like the portfolio's `projects.ts`) and constant animation updates (like Framer Motion lists), performing inline array derivations such as `project.tags.slice(0, 4)` during map iterations creates new array references on *every* render. This anti-pattern can trigger the garbage collector (GC) more frequently, which can manifest as micro-stutters during complex animation sequences.
**Action:** Always wrap static derived array calculations in a `useMemo` so that they are evaluated exactly once on mount. This ensures stable references and avoids unnecessary inline GC pressure.