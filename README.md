# A-Audit — Universal Audit Prompt Builder

> **Live app:** [https://lin4cre.github.io/a-audit/](https://lin4cre.github.io/a-audit/)

<p align="center">
  <img src="assets/a-audit-banner.svg" alt="A-Audit — Universal Audit Prompt Builder" width="100%" />
</p>

A-Audit is a zero-dependency, browser-based builder for creating structured, implementation-ready audit prompts for **Arena Agent Mode**. It helps turn a URL, product identifier, source-file inventory, or project folder into a focused audit brief for websites, mobile apps, desktop software, APIs, SaaS products, PWAs, browser extensions, games, e-commerce stores, and landing pages.

It is designed to be easy to host, private by default, and immediately usable on GitHub Pages.

## Highlights

- **Type-aware prompt generation** for 12 digital-product categories.
- **Smart auto-detection** from URLs, package IDs, store links, filenames, project structure, and readable local configuration/source signals.
- **Confidence explanations** that show the evidence behind a local file-based type classification and flag close matches for manual verification.
- **Local evidence selection** through files, folder pickers where supported, or drag and drop; selected content is classified in the browser.
- **Evidence manifest download** for sharing selected-file inventory, classification confidence, and Agent hand-off instructions.
- **Agent hand-off checklist** that makes the browser/Agent workspace boundary explicit.
- **Custom audit scope** with category, expert-role, depth, output-style, deliverable, and advanced-instruction controls.
- **Privacy-first opt-in persistence** for builder settings only—never file names, paths, file objects, or file contents.
- **Accessible, responsive interface** with semantic controls, visible focus states, `aria-pressed` status, and reduced-motion support.
- **No build step or dependencies**—open `index.html` locally or deploy it as a static site.

## Quick start

### Use the hosted version

Open **[lin4cre.github.io/a-audit](https://lin4cre.github.io/a-audit/)** once GitHub Pages is enabled for the repository.

### Run locally

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. Enter a target, or add local files/a project folder as supporting evidence.
4. Choose categories, experts, output depth, and deliverables.
5. Copy the generated prompt into Arena Agent Mode.

A local static server is optional but useful during development:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## How local evidence works

A-Audit processes selected files **inside the browser** to improve product-type detection. It uses safe, lightweight signals such as:

| Product type | Example signals |
|---|---|
| Website | `.html`, `<!doctype html>`, `<html>`, Vite/Next/Astro configuration |
| Android | `AndroidManifest.xml`, Gradle files, package/application ID, `.apk`, `.aab` |
| iOS | `.xcodeproj`, `.xcworkspace`, `Info.plist`, Swift/UIKit, `.ipa` |
| Browser extension | extension manifests, Manifest V3, browser-runtime patterns |
| PWA | web manifest, service-worker, Workbox, standalone display mode |
| API / DX platform | OpenAPI, Swagger, AsyncAPI, GraphQL, Postman collection signals |
| Desktop | Electron, Tauri, Wails, installer formats |
| Game | Unity, Unreal, Godot project indicators |
| E-commerce | Shopify, WooCommerce, cart/product patterns |

The UI reports a **high**, **medium**, or **low** confidence result and its reason. Where the top classifications are close, it asks for manual verification rather than overclaiming certainty.

### Important boundary

The browser cannot automatically pass local files to an Arena Agent workspace. If you want an agent to inspect or edit source code:

1. Select files in A-Audit only to help classify the target and generate a manifest.
2. Attach the actual source files or project folder directly to the Agent workspace.
3. Copy the generated prompt and, if helpful, the downloaded evidence manifest.

A-Audit does not execute files, upload selected files, inspect binaries, or persist file data.

## GitHub Pages deployment

This repository is already structured for GitHub Pages.

1. Create a GitHub repository named **`a-audit`** under the `LIN4CRE` account.
2. Upload the contents of this project to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. After GitHub publishes the site, it will be available at:

   ```text
   https://lin4cre.github.io/a-audit/
   ```

The included `.nojekyll` file ensures GitHub Pages serves this static project without Jekyll processing.

## Repository structure

```text
A-Audit/
├── assets/
│   └── a-audit-banner.svg     # Repository/social banner
├── index.html                 # Complete standalone application
├── README.md                  # Project documentation
├── LICENSE                    # MIT licence
├── .gitignore
└── .nojekyll                  # GitHub Pages static-site marker
```

## Development notes

- The application deliberately has no npm packages, remote fonts, trackers, build tooling, or external runtime dependencies.
- All application CSS and JavaScript are embedded in `index.html` to make distribution and GitHub Pages deployment straightforward.
- Folder selection uses browser-provided `webkitdirectory` support. When unavailable, the interface falls back to individual-file selection and drag/drop.
- Recursive dropped-folder processing is capped to avoid uncontrolled browser work.
- Local settings are stored only after explicit opt-in and can be cleared in the interface.

## Accessibility

A-Audit includes labelled controls, keyboard-operable buttons, visible focus treatment, accessible toggle state for segmented controls and presets, live feedback for file summaries/toasts, and a `prefers-reduced-motion` mode.

## License

Distributed under the [MIT License](LICENSE).
