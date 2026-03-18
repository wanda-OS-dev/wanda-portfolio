## 2024-05-18 - Form Accessibility Enhancements
**Learning:** Next.js static exports (`output: export`) may behave inconsistently with trailing slashes locally vs. deployed. Direct HTML access (`/contact.html`) is required for robust local Playwright testing when serving via `serve out`.
**Action:** When working on form accessibility components (like visual required markers and dynamic `aria-live` feedback), explicitly append `.html` to URLs during local validation scripts to prevent hydration timeouts.
