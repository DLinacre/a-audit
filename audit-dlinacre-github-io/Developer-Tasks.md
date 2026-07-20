# Developer & Product Task List (GitHub Issues Format)

---

### Task 1: Add Open Graph & Social Metadata
- **Title:** Add Open Graph and Twitter Card Meta Tags to `index.html`
- **Description:** Implement social preview tags so when links to Arena Audit are shared on Twitter, LinkedIn, or Slack, a rich preview card appears.
- **Acceptance criteria:** `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` meta tags are present and valid.
- **Priority:** High
- **Estimated effort:** 1 hour (Small)
- **Owner discipline:** Content / Engineering

---

### Task 2: Robust LocalStorage Error Boundaries
- **Title:** Wrap `localStorage` calls in try/catch error boundaries
- **Description:** Prevent potential uncaught exceptions in Safari private mode or restrictive browser settings where `localStorage` throws a security error.
- **Acceptance criteria:** All `localStorage.getItem` and `setItem` calls are safely wrapped; app degrades gracefully if storage is disabled.
- **Priority:** Medium
- **Estimated effort:** 2 hours (Small)
- **Owner discipline:** Engineering

---

### Task 3: Post-Copy Guidance Modal
- **Title:** Implement Post-Copy Handoff Modal
- **Description:** When the user clicks "Copy for Arena.AI", show a clean modal explaining next steps (e.g., "Prompt copied! Open Arena Agent Mode, start a new chat, and paste...").
- **Acceptance criteria:** Modal triggers on successful copy, includes a clear dismiss action, and provides direct guidance.
- **Priority:** High
- **Estimated effort:** 4 hours (Medium)
- **Owner discipline:** Design / Engineering / CRO

---

### Task 4: Custom Audit Preset Saving
- **Title:** Add Named Preset Saving & Loading
- **Description:** Allow users to save their current category toggles and settings as a custom named preset stored locally.
- **Acceptance criteria:** Users can save, select, and delete custom presets from a dropdown menu.
- **Priority:** Medium
- **Estimated effort:** 6 hours (Medium)
- **Owner discipline:** Engineering / UX

---

### Task 5: Mobile Prompt Preview Drawer
- **Title:** Implement Collapsible Mobile Prompt Preview Drawer
- **Description:** On mobile screens, hide the fixed side-by-side prompt pane behind a sticky bottom bar or collapsible drawer to improve usability.
- **Acceptance criteria:** Mobile users can easily toggle between editing controls and viewing the generated prompt without vertical clutter.
- **Priority:** High
- **Estimated effort:** 5 hours (Medium)
- **Owner discipline:** UX / UI Design / Engineering
