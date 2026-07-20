# Brand & Design Tokens Audit

## Color Palette Tokens (`:root`)
```css
:root {
  --bg: #0b0f14;
  --bg-elevated: #121821;
  --bg-card: #161d28;
  --bg-hover: #1c2533;
  --border: #273142;
  --border-strong: #3a4a63;
  --text: #e8eef7;
  --text-muted: #93a0b5;
  --text-dim: #7f8fa6; /* Elevated contrast for WCAG AA */
  --accent: #5b8cff;
  --accent-hover: #7aa2ff;
  --accent-soft: rgba(91, 140, 255, 0.14);
  --accent-glow: rgba(91, 140, 255, 0.35);
  --success: #3ecf8e;
  --success-soft: rgba(62, 207, 142, 0.14);
  --warning: #f0b429;
  --danger: #ff6b6b;
  --purple: #a78bfa;
  --radius: 14px;
  --font: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  --mono: "JetBrains Mono", "Fira Code", monospace;
}
```

## Typography Hierarchy
- **Headings:** Inter, bold weight, tight letter spacing.
- **Code & Prompts:** JetBrains Mono, regular weight, 13px line height.
