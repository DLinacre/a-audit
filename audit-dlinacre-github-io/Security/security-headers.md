# Security & Privacy Audit

## Defensive Recommendations
Because Arena Audit is hosted on GitHub Pages, explicit HTTP headers cannot be configured via server config files. However, security hardening can be augmented via meta tags:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://dlinacre.github.io; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta name="referrer-policy" content="strict-origin-when-cross-origin">
```

## Privacy Posture
- 100% client-side execution. Dropped files and inputted URLs never leave the user's browser, ensuring absolute compliance with corporate NDAs and data privacy standards.
