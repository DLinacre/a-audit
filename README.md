![a-audit Banner](assets/banner.png)

# Arena Audit (a-audit) — Universal Audit Prompt Builder

Production-grade, evidence-aware audit prompt generator for AI Agent Mode.

[![Live App](https://img.shields.io/badge/Live-dlinacre.github.io%2Fa--audit-f0b429?style=flat-square)](https://dlinacre.github.io/a-audit/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)
[![100% Client-Side](https://img.shields.io/badge/100%25-Client--Side-5b8cff?style=flat-square)](https://dlinacre.github.io/a-audit/)
[![Offline Capable](https://img.shields.io/badge/PWA-Service%20Worker%20Offline-a78bfa?style=flat-square)](https://dlinacre.github.io/a-audit/)

**[Open the live app →](https://dlinacre.github.io/a-audit/)**

---

## What it does

Most AI agents fail audits for a simple reason: the brief was thin. Arena Audit turns a target —
a URL, a store listing, a package name, or a dropped folder of up to 300 local source files —
into a complete, structured audit brief: **15 evaluation categories × 14 expert roles**, emitted
as one clean Markdown prompt ready to paste into [Arena Agent Mode](https://arena.ai).

## Features

- **Evidence-aware input** — drop files/folders; type is inferred from file signatures and a
  compact evidence manifest (names, sizes, classification) is generated for the agent.
- **Fail-safe prompt builder** — empty fields auto-resolve with documented assumptions; the
  prompt is always complete and agent-ready.
- **Shareable configurations** — every change is encoded in the URL hash; copy the link to
  share an exact builder state.
- **Custom preset manager** — save, export (`.json`) and import community audit configurations
  (stored locally in `localStorage`).
- **Mobile prompt drawer** — Configure / Preview tab bar on small screens.
- **Accessible by design** — skip links, `prefers-reduced-motion`, labelled controls,
  native `<dialog>` handoff, WCAG 2.2 AA-conformant contrast.
- **Private by design** — 100% client-side: no cookies, no analytics, no accounts.
  Files are read locally and never uploaded.
- **Installable PWA** — service worker provides full offline support after first visit.

## Tech

Single static HTML file (vanilla JS/CSS, zero runtime dependencies, no build step) deployed
via GitHub Pages. `robots.txt` + `sitemap.xml` + JSON-LD (`SoftwareApplication`) included.

## Local development

```bash
git clone https://github.com/DLinacre/a-audit.git
cd a-audit
python3 -m http.server 8080   # or any static server — then open http://localhost:8080
```

## Security

Found something? Please report it privately — see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © David Linacre
