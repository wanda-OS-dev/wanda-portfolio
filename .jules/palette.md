## 2024-05-18 - Ensure Keyboard Hover Parity on Complex Cards
**Learning:** In complex interactive cards with intricate hover states (like sliding border gradients, opacity changes, and inner content translations), screen reader users or keyboard navigators often miss the visual feedback indicating the element is focused because standard `focus-visible` only provides an outline.
**Action:** Apply `group` to the interactive container (e.g., `<Link>`) and ensure all child hover classes (`group-hover:*`) are paired with `group-focus-visible:*` to provide full visual parity for keyboard users.
