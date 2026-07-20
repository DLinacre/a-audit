# Priority Roadmap — Arena Audit (A-Audit)

## Phased Implementation Plan

### 1. Immediate (Today) — Quick Wins & Polish
- **Metadata Enhancement:** Add rich Open Graph and Twitter Card tags to `index.html` for professional social sharing previews.
- **Contrast Polish:** Darken `--text-dim` from `#6b7a90` to `#7f8fa6` to ensure 100% WCAG AA contrast compliance.
- **Robust Storage:** Wrap `localStorage` read/write operations in `try/catch` handlers to prevent incognito mode console errors.

### 2. Short Term (1–2 weeks) — High-Value Improvements
- **Post-Copy Modal:** When the user clicks "Copy for Arena.AI", display a helpful modal explaining how to paste the prompt into Arena Agent Mode.
- **Preset Management:** Allow users to save, rename, and load custom audit configurations in `localStorage`.
- **Direct Markdown Export:** Add a secondary action button to download the generated prompt directly as `audit-prompt.md`.

### 3. Medium Term (1–3 months) — Larger Enhancements
- **Category Tooltips:** Add interactive info icons beside each audit category with brief explanations of what the expert team evaluates.
- **Mobile Drawer:** Implement a responsive slide-up drawer for the prompt preview on mobile viewports so users can toggle settings without endless scrolling.
- **Analytics & Telemetry (Opt-in):** Add anonymous usage analytics to understand which audit categories and target types are most popular.

### 4. Long Term — Strategic Roadmap
- **Direct API Handoff:** Seamlessly connect with Arena.ai or other LLM APIs to initiate audits directly from the browser app.
- **Community Template Gallery:** Allow users to publish and share custom audit templates.
