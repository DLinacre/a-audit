/**
 * PIXEL HEIST & ARENA BUILDER — DOMAIN CONSTANTS
 * Extracted with 100% fidelity from legacy codebase.
 * Date: July 28, 2026
 */

import { CategoryItem, RoleItem, DeliverableItem, AdvancedItem, PresetDef } from '../types';

  export const TYPES: Record<string, any> = {
    auto: {
      id: "auto", label: "Auto-detect", short: "Auto", icon: "⚡",
      title: "MASTER PRODUCT AUDIT & GROWTH CONSULTANT",
      noun: "product", transform: "modern, trustworthy, high-performing product",
    },
    website: {
      id: "website", label: "Website / Web app", short: "Website", icon: "🌐",
      title: "MASTER WEBSITE AUDIT & GROWTH CONSULTANT",
      noun: "website", transform: "modern, fast, trustworthy, highly converting, search-optimized, accessible, production-ready website",
      standards: "WCAG 2.2, Core Web Vitals, modern SEO, responsive design, secure web defaults",
      fields: [
        { id: "version", label: "Version / environment", ph: "e.g. production, staging, v2" },
      ],
      input: { label: "Website URL", prefix: "https://", plain: false, ph: "example.com" },
      defaultCats: null, // all core web
      defaultRoles: null,
      scope: [
        "Homepage and primary navigation / footer",
        "Key primary pages (About, Services/Products, Contact, Blog/Resources, Legal if present)",
        "Mobile and desktop experiences (compare both)",
        "Information architecture, user journeys, CTAs, internal linking",
        "Public technical signals: robots.txt, sitemap, meta, schema, security headers",
      ],
      discover: "Start by discovering the site structure (homepage, nav, public sitemap/robots.txt, major linked pages). Then audit systematically.",
      assets: [
        "robots.txt recommendations", "sitemap recommendations", "meta / Open Graph tags",
        "JSON-LD Schema markup", "security header examples", "accessibility fix snippets",
        "performance optimisation snippets", "HTML / CSS / JS improvements",
      ],
      folders: ["SEO", "Accessibility", "Performance", "Security", "Content", "Design", "HTML", "CSS", "JavaScript", "Schema", "Robots", "Metadata"],
      catBodiesExtra: {},
    },
    ios: {
      id: "ios", label: "iOS App", short: "iOS", icon: "🍎",
      title: "MASTER iOS APP AUDIT & PRODUCT GROWTH CONSULTANT",
      noun: "iOS app", transform: "polished, trustworthy, accessible, high-converting, App Store–ready iOS product",
      standards: "Apple HIG, App Store Review Guidelines, VoiceOver / accessibility best practices, privacy nutrition labels, modern iOS UX patterns",
      fields: [
        { id: "storeUrl", label: "App Store / TestFlight URL", ph: "https://apps.apple.com/..." },
        { id: "bundleId", label: "Bundle ID", ph: "com.company.app" },
        { id: "version", label: "App version", ph: "e.g. 1.4.2" },
        { id: "platforms", label: "Devices / OS", ph: "iPhone, iPad · iOS 16+" },
      ],
      input: { label: "App name or App Store URL", prefix: "", plain: true, ph: "App name or apps.apple.com link" },
      defaultCats: ["executive","brand","ux","ui","content","aso","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","mobile","a11y","sec","iosdev","cro","mkt","pm","copy","ai"],
      scope: [
        "Public App Store listing (screenshots, description, ratings, privacy labels) if available",
        "Onboarding, core user flows, navigation patterns, empty/error states",
        "Visual design quality vs Apple Human Interface Guidelines",
        "Accessibility (VoiceOver, Dynamic Type, contrast, hit targets)",
        "Performance perceptions, stability signals from public reviews",
        "Monetization / conversion surfaces (paywall, trials, IAP if public)",
        "Privacy, permissions, and trust signals",
      ],
      discover: "Use only publicly available information: App Store page, marketing site, public docs, changelogs, and user-visible review themes. Do not reverse engineer binaries or recommend sideloading/cracking.",
      assets: [
        "App Store metadata rewrite suggestions", "screenshot / preview storyboard notes",
        "privacy nutrition label checklist", "onboarding copy drafts",
        "HIG-aligned UI recommendations", "accessibility fix list",
        "release QA checklist", "ASO keyword opportunities",
      ],
      folders: ["ASO", "Accessibility", "UX", "UI", "Privacy", "Security", "Content", "Onboarding", "QA", "Metadata"],
    },
    android: {
      id: "android", label: "Android App (APK / Play)", short: "Android", icon: "🤖",
      title: "MASTER ANDROID APP AUDIT & PRODUCT GROWTH CONSULTANT",
      noun: "Android app", transform: "polished, trustworthy, accessible, high-converting, Play Store–ready Android product",
      standards: "Material Design 3, Google Play policies, Android accessibility, privacy & permissions best practices, modern Android UX",
      fields: [
        { id: "storeUrl", label: "Play Store URL", ph: "https://play.google.com/store/apps/..." },
        { id: "packageId", label: "Package name", ph: "com.company.app" },
        { id: "apkName", label: "APK / AAB filename (optional)", ph: "app-release.apk" },
        { id: "version", label: "Version name / code", ph: "e.g. 2.1.0 (210)" },
        { id: "platforms", label: "Devices / OS", ph: "Phone, tablet · Android 8+" },
      ],
      input: { label: "App name, package, or Play URL", prefix: "", plain: true, ph: "com.example.app or Play Store link" },
      defaultCats: ["executive","brand","ux","ui","content","aso","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","mobile","a11y","sec","androiddev","cro","mkt","pm","copy","ai"],
      scope: [
        "Public Play Store listing (graphics, description, ratings, data safety) if available",
        "Onboarding, core flows, navigation, empty/error states",
        "Material Design consistency and modern Android patterns",
        "Accessibility (TalkBack, font scaling, contrast, touch targets)",
        "Performance / battery / stability signals from public reviews",
        "Permissions, privacy, and trust",
        "Conversion surfaces (subscriptions, trials, store listing CRO)",
      ],
      discover: "Use only public signals: Play listing, marketing site, public docs, changelogs, review themes. Do NOT reverse engineer APKs, bypass licensing, or recommend malware analysis techniques. Defensive security commentary only from public-facing behaviour.",
      assets: [
        "Play Store listing rewrite suggestions", "feature graphic / screenshot notes",
        "Data safety form checklist", "onboarding copy drafts",
        "Material 3 UI recommendations", "accessibility fix list",
        "release QA checklist", "ASO keyword opportunities",
      ],
      folders: ["ASO", "Accessibility", "UX", "UI", "Privacy", "Security", "Content", "Onboarding", "QA", "Metadata"],
    },
    desktop: {
      id: "desktop", label: "Desktop App", short: "Desktop", icon: "💻",
      title: "MASTER DESKTOP APPLICATION AUDIT & PRODUCT CONSULTANT",
      noun: "desktop application", transform: "reliable, polished, accessible, secure, high-value desktop product",
      standards: "platform HIG (Windows Fluent / macOS HIG / GNOME or equivalent), desktop accessibility, secure update practices, modern desktop UX",
      fields: [
        { id: "os", label: "Target OS", ph: "Windows / macOS / Linux / multi" },
        { id: "exeName", label: "Executable / installer name", ph: "AppSetup.exe, App.dmg, .AppImage" },
        { id: "version", label: "Version", ph: "e.g. 3.2.1" },
        { id: "distUrl", label: "Download / product URL", ph: "https://..." },
      ],
      input: { label: "App name, site, or installer", prefix: "", plain: true, ph: "App name, product URL, or MyApp.exe" },
      defaultCats: ["executive","brand","ux","ui","content","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","desktop","a11y","sec","dev","pm","copy","ai","mkt"],
      scope: [
        "Public product site / download page / changelog if available",
        "Installer / first-run / onboarding experience (as described publicly)",
        "Core workflows, windowing, navigation, settings, empty/error states",
        "Cross-platform consistency if multi-OS",
        "Accessibility and keyboard-first usage",
        "Update mechanism, code signing, and public security posture",
        "Performance perceptions and resource use from public feedback",
      ],
      discover: "Use public product pages, docs, changelogs, screenshots, and review themes. Do not reverse engineer executables or recommend cracking, keygens, or malware techniques.",
      assets: [
        "installer / first-run checklist", "settings IA recommendations",
        "accessibility keyboard map", "security hardening checklist (defensive)",
        "release notes template", "UI polish backlog", "onboarding copy",
      ],
      folders: ["UX", "UI", "Accessibility", "Security", "Performance", "Installer", "Content", "QA", "Docs"],
    },
    saas: {
      id: "saas", label: "SaaS product", short: "SaaS", icon: "☁️",
      title: "MASTER SAAS PRODUCT AUDIT & GROWTH CONSULTANT",
      noun: "SaaS product", transform: "clear, trustworthy, conversion-optimized, scalable SaaS product experience",
      standards: "modern SaaS UX patterns, WCAG 2.2, Core Web Vitals, B2B/B2C conversion best practices, secure multi-tenant defaults",
      fields: [
        { id: "pricingUrl", label: "Pricing page URL", ph: "https://.../pricing" },
        { id: "docsUrl", label: "Docs / help center", ph: "https://docs..." },
        { id: "version", label: "Plan / tier focus", ph: "Free, Pro, Enterprise" },
      ],
      input: { label: "Product URL", prefix: "https://", plain: false, ph: "app.example.com" },
      defaultCats: ["executive","brand","ux","ui","content","seo","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","seo","perf","a11y","sec","dev","cro","mkt","pm","copy","ai"],
      scope: [
        "Marketing site + product app entry points (login, signup, pricing)",
        "Activation / onboarding, empty states, core jobs-to-be-done",
        "Pricing clarity, plan comparison, upgrade paths",
        "Trust, security, compliance, and social proof",
        "Docs / support discoverability",
        "Performance, accessibility, SEO for public pages",
      ],
      discover: "Audit publicly reachable marketing and product surfaces. If app requires login, evaluate only public screens and documented flows; mark gated areas as unable to verify.",
      assets: [
        "pricing page copy improvements", "onboarding flow map", "meta/SEO for public pages",
        "schema for software application", "security/trust page outline",
        "activation metric recommendations", "UI component polish notes",
      ],
      folders: ["SEO", "CRO", "Onboarding", "Pricing", "Accessibility", "Performance", "Security", "Content", "Design", "Docs"],
    },
    extension: {
      id: "extension", label: "Browser extension", short: "Extension", icon: "🧩",
      title: "MASTER BROWSER EXTENSION AUDIT & GROWTH CONSULTANT",
      noun: "browser extension", transform: "useful, privacy-respecting, high-rated, store-compliant browser extension",
      standards: "Chrome Web Store / Firefox AMO policies, Manifest V3 patterns, extension UX best practices, least-privilege permissions",
      fields: [
        { id: "storeUrl", label: "Store listing URL", ph: "Chrome Web Store / AMO link" },
        { id: "browsers", label: "Browsers", ph: "Chrome, Edge, Firefox, Safari" },
        { id: "version", label: "Version", ph: "e.g. 1.0.3" },
      ],
      input: { label: "Extension name or store URL", prefix: "", plain: true, ph: "Name or chromewebstore.google.com link" },
      defaultCats: ["executive","brand","ux","ui","content","aso","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","sec","dev","cro","mkt","pm","copy","a11y"],
      scope: [
        "Public store listing (description, screenshots, permissions, ratings)",
        "Install / first-run / popup / options UX",
        "Permission justification and privacy trust",
        "Performance impact claims and review themes",
        "Conversion (install → active use → paid if applicable)",
      ],
      discover: "Use store listing and public marketing materials only. Do not decompile extension packages or recommend policy-violating practices.",
      assets: [
        "store listing rewrite", "permission rationale copy", "popup UX notes",
        "privacy policy outline", "screenshot storyboard", "review-response templates",
      ],
      folders: ["Store-Listing", "UX", "UI", "Privacy", "Security", "Content", "QA"],
    },
    api: {
      id: "api", label: "API / Developer platform", short: "API", icon: "🔌",
      title: "MASTER API & DEVELOPER PLATFORM AUDIT CONSULTANT",
      noun: "API / developer platform", transform: "clear, trustworthy, well-documented, developer-loved platform",
      standards: "OpenAPI/docs best practices, developer experience (DX), auth security baselines, status/reliability communication",
      fields: [
        { id: "docsUrl", label: "Docs URL", ph: "https://docs..." },
        { id: "statusUrl", label: "Status page", ph: "https://status..." },
        { id: "version", label: "API version", ph: "v1 / v2" },
      ],
      input: { label: "API / platform URL", prefix: "https://", plain: false, ph: "api.example.com or docs site" },
      defaultCats: ["executive","brand","ux","content","seo","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["dev","pm","copy","sec","mkt","brand","ai","ux"],
      scope: [
        "Developer portal, docs IA, quickstarts, auth guides",
        "API reference clarity, examples, error model",
        "Pricing, limits, support paths",
        "Trust: status page, security, compliance claims",
        "DX friction and onboarding time-to-hello-world",
      ],
      discover: "Audit public docs, portals, changelogs, and status pages. Do not attempt unauthorized API access.",
      assets: [
        "docs IA outline", "quickstart rewrite", "OpenAPI description improvements",
        "error message guidelines", "status page checklist", "pricing clarity notes",
      ],
      folders: ["Docs", "DX", "Security", "Content", "Pricing", "Status", "SEO"],
    },
    landing: {
      id: "landing", label: "Landing page", short: "Landing", icon: "🚀",
      title: "MASTER LANDING PAGE & CONVERSION AUDIT CONSULTANT",
      noun: "landing page", transform: "high-converting, clear, fast, trustworthy landing experience",
      standards: "CRO best practices, Core Web Vitals, accessibility, message-market fit heuristics",
      fields: [
        { id: "goal", label: "Primary conversion goal", ph: "Sign up, book demo, waitlist, buy" },
      ],
      input: { label: "Landing page URL", prefix: "https://", plain: false, ph: "example.com/launch" },
      defaultCats: ["executive","brand","ux","ui","content","seo","performance","accessibility","cro","competitive","missing","priority"],
      defaultRoles: ["cro","ux","ui","brand","copy","mkt","seo","perf","pm"],
      scope: [
        "Above-the-fold clarity and value proposition",
        "Social proof, objections, CTA hierarchy",
        "Form friction, mobile conversion, speed",
        "SEO basics for the page if organic traffic matters",
      ],
      discover: "Audit the public landing URL and linked confirmation/legal pages.",
      assets: [
        "headline/subhead alternatives", "CTA copy variants", "section reorder plan",
        "meta tags", "speed quick wins", "A/B test ideas",
      ],
      folders: ["CRO", "Copy", "Design", "Performance", "SEO", "Accessibility"],
    },
    ecommerce: {
      id: "ecommerce", label: "E-commerce store", short: "E-comm", icon: "🛒",
      title: "MASTER E-COMMERCE STORE AUDIT & GROWTH CONSULTANT",
      noun: "e-commerce store", transform: "fast, trustworthy, conversion-optimized online store",
      standards: "e-commerce CRO, Core Web Vitals, accessibility, product SEO, checkout UX best practices",
      fields: [
        { id: "platform", label: "Platform (if known)", ph: "Shopify, Woo, custom…" },
      ],
      input: { label: "Store URL", prefix: "https://", plain: false, ph: "shop.example.com" },
      defaultCats: ["executive","brand","ux","ui","content","seo","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","seo","perf","a11y","sec","dev","cro","mkt","pm","copy"],
      scope: [
        "Home, collection, product detail, cart, checkout (public steps)",
        "Trust, shipping, returns, payment reassurance",
        "Merchandising, search, filters, mobile shopping",
        "SEO for products/collections, performance, accessibility",
      ],
      discover: "Audit public storefront pages. Do not place real orders or test payment fraud; mark checkout steps that require purchase as partially verifiable.",
      assets: [
        "PDP content template", "trust badge / policy recommendations",
        "meta/schema for products", "CRO experiment list", "performance image plan",
      ],
      folders: ["CRO", "SEO", "Product-Pages", "Checkout", "Performance", "Accessibility", "Content", "Security"],
    },
    game: {
      id: "game", label: "Game", short: "Game", icon: "🎮",
      title: "MASTER GAME PRODUCT AUDIT & GROWTH CONSULTANT",
      noun: "game", transform: "engaging, clear, polished, retention-friendly game product",
      standards: "platform store guidelines, onboarding/FTUE best practices, accessibility for games where applicable, ethical monetization patterns",
      fields: [
        { id: "storeUrl", label: "Store page", ph: "Steam / App Store / Play / itch" },
        { id: "platforms", label: "Platforms", ph: "PC, iOS, Android, console" },
        { id: "version", label: "Version / build", ph: "e.g. 0.9.1 Early Access" },
      ],
      input: { label: "Game name or store URL", prefix: "", plain: true, ph: "Game title or store link" },
      defaultCats: ["executive","brand","ux","ui","content","aso","performance","accessibility","technical","cro","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","mobile","game","pm","mkt","copy","cro"],
      scope: [
        "Store page conversion (trailer, screenshots, description)",
        "First-time user experience / tutorial clarity (from public footage/docs)",
        "Retention and progression clarity signals",
        "Monetization fairness and clarity if applicable",
        "Performance/stability themes from reviews",
      ],
      discover: "Use public store pages, trailers, patch notes, and review themes. Do not pirate, crack, or reverse engineer game builds.",
      assets: [
        "store page rewrite", "screenshot/trailer storyboard", "FTUE improvement list",
        "patch communication template", "accessibility options checklist",
      ],
      folders: ["Store", "FTUE", "UX", "Retention", "Content", "QA", "Marketing"],
    },
    pwa: {
      id: "pwa", label: "Progressive Web App", short: "PWA", icon: "📱",
      title: "MASTER PWA AUDIT & GROWTH CONSULTANT",
      noun: "progressive web app", transform: "installable, fast, reliable, accessible PWA",
      standards: "PWA installability criteria, service worker best practices, WCAG 2.2, Core Web Vitals, offline UX patterns",
      fields: [
        { id: "version", label: "Version / channel", ph: "production" },
      ],
      input: { label: "PWA URL", prefix: "https://", plain: false, ph: "app.example.com" },
      defaultCats: ["executive","brand","ux","ui","content","seo","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","perf","a11y","sec","dev","seo","cro","pm","copy"],
      scope: [
        "Web app UX plus install prompt / manifest / offline signals if publicly observable",
        "Mobile home-screen experience expectations",
        "Performance, accessibility, SEO, security headers",
        "Engagement and re-engagement patterns (push only if publicly documented)",
      ],
      discover: "Fetch public pages and manifest if exposed. Mark service-worker internals unable to verify when not publicly inspectable without invasive tooling.",
      assets: [
        "web manifest recommendations", "offline UX notes", "install funnel copy",
        "performance fixes", "meta/SEO", "security headers",
      ],
      folders: ["PWA", "Performance", "Accessibility", "SEO", "Security", "UX", "Content"],
    },
    generic: {
      id: "generic", label: "Generic digital product", short: "Product", icon: "📦",
      title: "MASTER DIGITAL PRODUCT AUDIT & GROWTH CONSULTANT",
      noun: "digital product", transform: "clear, trustworthy, high-value digital product experience",
      standards: "modern product UX, accessibility, security hygiene, conversion and messaging clarity",
      fields: [
        { id: "version", label: "Version", ph: "optional" },
      ],
      input: { label: "Product name or URL", prefix: "", plain: true, ph: "Name, URL, or identifier" },
      defaultCats: ["executive","brand","ux","ui","content","performance","accessibility","security","technical","cro","ai","competitive","missing","priority"],
      defaultRoles: ["ux","ui","brand","dev","pm","copy","mkt","cro","a11y","sec","ai"],
      scope: [
        "Public product presence (site, store, docs, listings)",
        "Core value proposition and user journey clarity",
        "Trust, quality, and conversion surfaces",
        "Technical/UX quality signals available publicly",
      ],
      discover: "Infer the best public surfaces from the provided identifiers and audit only what is publicly reachable.",
      assets: [
        "positioning statement options", "UX issue list", "roadmap priorities",
        "trust content outline", "implementation task list",
      ],
      folders: ["Strategy", "UX", "UI", "Content", "Security", "QA", "Growth"],
    },
  };

  /* ═══════════════════════════════════════════════════════════════
     CATEGORIES / ROLES / DELIVERABLES
     ═══════════════════════════════════════════════════════════════ */
  export const CATEGORIES: CategoryItem[] = [
    { id: "executive", name: "Executive Summary", desc: "Scores, strengths, weaknesses, business impact", badge: "Core", types: "all" },
    { id: "brand", name: "Brand Review", desc: "Identity, visual system, positioning, trust", badge: "Design", types: "all" },
    { id: "ux", name: "User Experience", desc: "Flows, IA, friction, navigation, onboarding", badge: "UX", types: "all" },
    { id: "ui", name: "User Interface", desc: "Hierarchy, spacing, components, platform UI", badge: "Design", types: "all" },
    { id: "content", name: "Content / Copy", desc: "Clarity, tone, store text, microcopy, rewrites", badge: "Content", types: "all" },
    { id: "seo", name: "SEO Audit", desc: "Titles, schema, crawl, keywords (web)", badge: "Growth", types: ["website","saas","landing","ecommerce","pwa","api","generic"] },
    { id: "aso", name: "ASO / Store Optimization", desc: "Store listing, keywords, creatives, ratings", badge: "Growth", types: ["ios","android","extension","game"] },
    { id: "performance", name: "Performance", desc: "Speed, CWV, jank, battery, load times", badge: "Tech", types: "all" },
    { id: "accessibility", name: "Accessibility", desc: "WCAG / platform a11y, keyboard, SR, contrast", badge: "A11y", types: "all" },
    { id: "security", name: "Security & Privacy", desc: "Public hardening, permissions, privacy trust", badge: "Sec", types: "all" },
    { id: "technical", name: "Technical / Bugs", desc: "Quality issues, broken paths, stack signals", badge: "Bugs", types: "all" },
    { id: "cro", name: "Conversion (CRO)", desc: "CTAs, funnels, paywalls, checkout, install", badge: "Growth", types: "all" },
    { id: "ai", name: "AI Opportunities", desc: "Assistants, automation, personalization", badge: "AI", types: "all" },
    { id: "competitive", name: "Competitive Positioning", desc: "Vs modern market best practices", badge: "Strategy", types: "all" },
    { id: "missing", name: "Missing Features", desc: "High-value gaps and product additions", badge: "Product", types: "all" },
    { id: "priority", name: "Priority Matrix", desc: "Critical → Low with effort & impact", badge: "Core", types: "all" },
  ];

  export const ROLES: RoleItem[] = [
    { id: "ux", name: "Senior UX Designer", types: "all" },
    { id: "ui", name: "UI Designer", types: "all" },
    { id: "brand", name: "Brand Strategist", types: "all" },
    { id: "seo", name: "SEO Consultant", types: ["website","saas","landing","ecommerce","pwa","api"] },
    { id: "techseo", name: "Technical SEO Specialist", types: ["website","saas","ecommerce","pwa"] },
    { id: "perf", name: "Web Performance Engineer", types: ["website","saas","landing","ecommerce","pwa"] },
    { id: "a11y", name: "Accessibility Expert", types: "all" },
    { id: "sec", name: "Cyber Security Consultant", types: "all" },
    { id: "dev", name: "Full Stack / Product Developer", types: "all" },
    { id: "iosdev", name: "iOS Engineer", types: ["ios"] },
    { id: "androiddev", name: "Android Engineer", types: ["android"] },
    { id: "mobile", name: "Mobile Product Specialist", types: ["ios","android","pwa","game"] },
    { id: "desktop", name: "Desktop Software Specialist", types: ["desktop"] },
    { id: "game", name: "Game Design / LiveOps Advisor", types: ["game"] },
    { id: "cro", name: "CRO Specialist", types: "all" },
    { id: "mkt", name: "Digital Marketing Strategist", types: "all" },
    { id: "pm", name: "Product Manager", types: "all" },
    { id: "copy", name: "Copywriter", types: "all" },
    { id: "ai", name: "AI & Automation Consultant", types: "all" },
  ];

  export const DELIVERABLES: DeliverableItem[] = [
    { id: "report", name: "Full audit report (by section)", default: true },
    { id: "action", name: "Phased action plan (Today → Long-term)", default: true },
    { id: "tasks", name: "GitHub-ready developer / product task list", default: true },
    { id: "assets", name: "Ready-to-implement assets & templates", default: true },
    { id: "zip", name: "Proposed package / workspace folder structure", default: true },
    { id: "scores", name: "Category scores out of 100 + overall", default: true },
    { id: "rewrites", name: "Suggested copy / listing rewrites", default: true },
    { id: "snippets", name: "Code / config / checklist snippets", default: true },
  ];

  export const ADVANCED: AdvancedItem[] = [
    { id: "publicOnly", name: "Public sources only", desc: "Never invent findings; mark unverifiable items", default: true },
    { id: "evidence", name: "Evidence per issue", desc: "Description, evidence, impact, solution, effort", default: true },
    { id: "noOffense", name: "Defensive security only", desc: "No reverse engineering, cracking, or offensive testing", default: true },
    { id: "implementable", name: "Implementation-ready", desc: "Dev/agent can start without further clarification", default: true },
    { id: "workspace", name: "Write files to workspace", desc: "Create report + asset files in the agent workspace", default: true },
    { id: "screenshots", name: "Visual annotation style", desc: "Describe UI as if annotating screenshots", default: true },
    { id: "failSafe", name: "Fail-safe incomplete inputs", desc: "Agent must still produce best possible audit from partial data", default: true },
    { id: "multiSurface", name: "Multi-surface when relevant", desc: "Site + store + docs if publicly linked", default: true },
  ];

  export const DEPTH_HINTS: Record<string, string> = {
    focused: "Faster pass on selected categories only — ideal for one problem area.",
    full: "Full multi-discipline audit with scores, roadmap, and implementable assets.",
    forensic: "Maximum depth: exhaustive notes, edge cases, stricter evidence standards.",
  };
  export const STYLE_HINTS: Record<string, string> = {
    concise: "Tight executive findings + top actions. Less prose, more bullets.",
    detailed: "Rich report + priority matrix + tasks + ready-to-implement files.",
    agent: "Maximum structure for autonomous agents: paths, acceptance criteria, snippets.",
  };

  export const PRESET_DEFS: PresetDef[] = [
    { id: "master", label: "Master Audit" },
    { id: "seo", label: "SEO Focus", webOnly: true },
    { id: "aso", label: "Store / ASO", storeOnly: true },
    { id: "perf", label: "Performance" },
    { id: "a11y", label: "Accessibility" },
    { id: "cro", label: "Conversion" },
    { id: "security", label: "Security" },
    { id: "bugs", label: "Bug Hunt" },
    { id: "redesign", label: "Redesign Brief" },
    { id: "onboarding", label: "Onboarding" },
  ];

  /* ═══════════════════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════════════════ */