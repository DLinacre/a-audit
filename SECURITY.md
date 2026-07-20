# Security Policy

## Supported Versions
The live site at https://dlinacre.github.io/a-audit/ always tracks the current `main` branch;
only the latest version receives fixes.

## Reporting a Vulnerability
Please report vulnerabilities **privately** via GitHub Security Advisories for this repository
(Security tab → "Report a vulnerability"), or via the contact details on the maintainer's
GitHub profile https://github.com/DLinacre.

Please do not open public issues for security reports.

- You can expect an acknowledgement within 72 hours.
- If accepted, a fix will target the next deploy; reporters are credited unless they prefer otherwise.

## Scope notes
Arena Audit is a fully client-side static app. In-scope findings include DOM XSS,
unsafe file-name rendering, deceptive handoff behaviour, and dependency/supply-chain
issues should any be introduced. DoS against GitHub Pages infrastructure is out of scope.
