# Accessibility Audit (WCAG 2.2)

## Findings
- **Strengths:** Excellent use of `aria-pressed`, `role="group"`, and keyboard navigable tab buttons.
- **Areas for Improvement:** 
  - Muted text color (`--text-dim: #6b7a90`) on dark card surfaces (`#161d28`) achieves ~3.8:1 contrast ratio, slightly below the WCAG AA 4.5:1 requirement for normal text.
  - Focus rings on custom segment buttons could be more prominent when navigating via keyboard (`Tab`).

## Recommendations
1. Elevate `--text-dim` to `#8293ad` to guarantee > 4.5:1 contrast.
2. Add explicit `:focus-visible` outline styles (`outline: 2px solid var(--accent); outline-offset: 2px;`) to all interactive controls.
