1. **Optimize `AIReasoningVisualizer.tsx`**:
   - Hoist `Object.values(nodesDict)` outside the component to a module-level constant.
   - Remove the `useMemo` hook to shift calculation and allocation to module evaluation time, avoiding unnecessary CPU cycles, React hook overhead, and GC churn during component mount/unmount.
2. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
3. **Submit the PR**:
   - Provide a title and description formatted with Bolt's specific structure.
