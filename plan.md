1. **Optimize `Nav.tsx` with `useMemo`**
   - Import `useMemo` from `react`.
   - Pre-calculate the `isActive` state for all navigation links using `useMemo` dependent on `pathname`.
   - Replace the inline string operations (`pathname === href || pathname.startsWith(...)`) in both the desktop and mobile map loops with a lookup from the memoized states.
   - This prevents redundant string operations during render loops and avoids recalculating active states on state changes (e.g., scrolling or opening the mobile menu).
2. **Verify changes**
   - Run all relevant tests and linting checks (e.g., `pnpm build` or equivalent) to ensure the optimization is correct and no functionality is broken.
3. **Complete pre commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
4. **Submit the change**
   - Commit the changes with a descriptive message explaining the performance optimization and its impact, and submit the PR.
