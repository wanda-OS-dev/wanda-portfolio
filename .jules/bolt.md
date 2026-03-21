## 2025-03-21 - [Optimize Static Data Processing]
**Learning:** In Next.js apps using static, imported data, using `Array.prototype.findIndex`, `Array.prototype.slice` or inline object allocations (e.g. for fallbacks) within render loops causes unnecessary Garbage Collection (GC) pressure and micro-stutters.
**Action:** Instead of inline operations, pre-calculate derivative lists and reference maps entirely outside the component's scope to convert O(N) operations into O(1) lookups.
