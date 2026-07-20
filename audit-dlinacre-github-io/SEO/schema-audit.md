# SEO Schema Audit & Recommendations

## Current State
- Missing structured JSON-LD data for SoftwareApplication or WebApplication.

## Recommendation
Implement the following JSON-LD Schema in the `<head>` of `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Arena Audit",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A-Audit builds production-grade, evidence-aware audit prompts for digital products — ready for Arena Agent Mode.",
  "url": "https://dlinacre.github.io/a-audit/"
}
```
