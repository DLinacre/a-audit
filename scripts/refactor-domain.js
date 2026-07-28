const fs = require('fs');

const html = fs.readFileSync('/home/user/a-audit/index.html', 'utf8');
const lines = html.split('\n');

// 1. EXTRACT CONSTANTS (lines 1232 to 1661)
const constStart = lines.findIndex(l => l.includes('const TYPES ='));
const constEnd = lines.findIndex(l => l.includes('const state ='));
const constCode = lines.slice(constStart, constEnd).join('\n')
  .replace('const TYPES =', 'export const TYPES: Record<string, any> =')
  .replace('const CATEGORIES =', 'export const CATEGORIES: CategoryItem[] =')
  .replace('const ROLES =', 'export const ROLES: RoleItem[] =')
  .replace('const DELIVERABLES =', 'export const DELIVERABLES: DeliverableItem[] =')
  .replace('const ADVANCED =', 'export const ADVANCED: AdvancedItem[] =')
  .replace('const DEPTH_HINTS =', 'export const DEPTH_HINTS: Record<string, string> =')
  .replace('const STYLE_HINTS =', 'export const STYLE_HINTS: Record<string, string> =')
  .replace('const PRESET_DEFS =', 'export const PRESET_DEFS: PresetDef[] =');

const tsConstants = `/**
 * PIXEL HEIST & ARENA BUILDER — DOMAIN CONSTANTS
 * Extracted with 100% fidelity from legacy codebase.
 * Date: July 28, 2026
 */

import { CategoryItem, RoleItem, DeliverableItem, AdvancedItem, PresetDef } from '../types';

` + constCode;

fs.writeFileSync('/home/user/a-audit/src/domain/constants.ts', tsConstants, 'utf8');
console.log('Generated src/domain/constants.ts');

// 2. EXTRACT HELPERS (typeApplies, cleanRaw, catBodiesFor, relevantCategories, relevantRoles, selectedList)
const helpersCode = `/**
 * PIXEL HEIST & ARENA BUILDER — PURE DOMAIN HELPERS
 * Pure functional transformations with zero DOM side-effects.
 * Date: July 28, 2026
 */

import { TYPES, CATEGORIES, ROLES } from './constants';
import { TargetTypeId, CategoryItem, RoleItem, BuilderState, ResolvedType } from '../types';

export function typeApplies(spec: any, typeId: string): boolean {
  if (spec === "all" || !spec) return true;
  return Array.isArray(spec) && spec.includes(typeId);
}

export function cleanRaw(s: string | undefined | null): string {
  return (s || "")
    .replace(/[\\[\\]\\(\\)]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

export function relevantCategories(typeId: string): CategoryItem[] {
  return CATEGORIES.filter(c => typeApplies(c.appliesTo, typeId));
}

export function relevantRoles(typeId: string): RoleItem[] {
  return ROLES.filter(r => typeApplies(r.appliesTo, typeId));
}

export function selectedList<T extends { id: string }>(map: Record<string, boolean>, items: T[]): T[] {
  return items.filter(i => map[i.id] !== false);
}

export function catBodiesFor(typeId: string, name: string): Record<string, string[]> {
  const webish = ["website","saas","landing","ecommerce","pwa","api"].includes(typeId);
  const storeish = ["ios","android","extension","game"].includes(typeId);
  const appish = ["ios","android","desktop","extension","game","pwa"].includes(typeId);

  return {
    executive: [
      \`Overall \${TYPES[typeId]?.noun || "product"} score (/100)\`,
      "Biggest strengths",
      "Biggest weaknesses",
      "Highest-priority improvements",
      "Estimated effort vs business impact",
    ],
    brand: [
      "Identity, logo, typography, colour system (as publicly visible)",
      "Visual consistency and professional appearance",
      "Trustworthiness and brand personality",
      "Positioning and messaging clarity",
    ],
    ux: [
      "Navigation, ease of use, user flows",
      "Layout hierarchy and information architecture",
      "Mobile vs desktop usability, CTA placement, forms",
      "Readability and friction points",
    ],
    ui: [
      "Visual hierarchy, spacing, alignment, contrast",
      "Component consistency, icons, motion, density",
      "Responsiveness and modern design practices",
      "Concrete UI improvement recommendations",
    ],
    content: [
      "Clarity, grammar, tone, structure on major surfaces",
      "Trust signals, CTAs, thin/duplicate/missing content",
      "Missing pages or sections",
      "Suggest rewritten content where beneficial",
    ],
    seo: webish ? [
      "Page titles, meta descriptions, heading hierarchy",
      "Canonicals, robots.txt, sitemap, schema/JSON-LD",
      "Internal linking, URL structure, image SEO/alt text",
      "Crawlability/indexability, keyword opportunities, content gaps",
      "Prioritise fixes by SEO impact",
    ] : [
      "Title / subtitle / short description keyword strategy",
      "Long description structure and conversion copy",
      "Screenshot / preview video narrative quality",
      "Ratings & review themes (public), reply strategy",
      "Localization and category positioning opportunities",
      "Creative A/B ideas for store listing",
    ],
    performance: webish ? [
      "Core Web Vitals signals observable publicly",
      "Page weight, images, fonts, JS/CSS bloat",
      "Lazy loading, compression, caching, request chains",
      "Practical optimisation techniques with expected impact",
    ] : [
      "Launch time / perceived performance (from public signals & reviews)",
      "Jank, stability, crash themes in public feedback",
      "Asset weight / media optimisation opportunities",
      "Battery, memory, or network efficiency concerns if evidenced",
      "Practical optimisation recommendations",
    ],
    accessibility: appish ? [
      "Platform accessibility: VoiceOver/TalkBack/keyboard, focus order",
      "Dynamic type / font scaling, contrast, hit target sizes",
      "Labels, traits, captions, reduced motion support",
      "Forms and error announcements",
      "Assign an accessibility score and top remediation path",
    ] : [
      "WCAG 2.2 oriented review",
      "Keyboard navigation, focus, ARIA, contrast",
      "Semantic HTML, screen-reader friendliness, forms, headings, alt text",
      "Error handling; assign an accessibility score",
    ],
    security: appish ? [
      "Public privacy labels / data safety / permission rationale",
      "Transport security expectations, session/auth trust signals",
      "Update integrity / code signing signals if public",
      "Sensitive data handling claims vs public policy text",
      "Defensive recommendations only — no reverse engineering",
    ] : [
      "HTTPS, security headers (CSP, HSTS, frame protections, Referrer-Policy)",
      "Cookie flags (where visible), mixed content, exposed public files",
      "Clickjacking protections and public hardening signals",
      "Defensive recommendations only",
    ],
    technical: [
      "Quality defects, broken links/paths/assets, obvious bugs",
      "Platform/stack signals and maintainability observations",
      "Third-party dependencies with user-visible impact",
      "Bug list with severity and fix guidance",
    ],
    cro: storeish ? [
      "Store listing conversion (icon, social proof, CTA clarity)",
      "Install → activate → pay/subscribe funnel friction",
      "Paywall / trial / pricing clarity if public",
      "Social proof and trust signals",
      "Concrete conversion rate optimisation ideas",
    ] : [
      "Calls to action, signup/checkout/contact flows",
      "Trust badges, testimonials, social proof",
      "Conversion friction and funnel gaps",
      "Recommendations that increase conversions",
    ],
    ai: [
      "In-product AI assistants, copilots, or support bots",
      "Automation for onboarding, support, content, analytics",
      "Personalization and lead/user qualification opportunities",
      "Estimate expected business value for each opportunity",
    ],
    competitive: [
      "Compare against current best practices in this market",
      "Where " + name + " is above average / average / behind",
      "Patterns worth adopting (without inventing unverified competitor claims)",
    ],
    missing: [
      "High-value missing features, pages, policies, or product surfaces",
      "Trust/legal pages, help content, onboarding, analytics, accessibility statement, etc.",
      "Prioritise by business value",
    ],
    priority: [
      "Categorise every recommendation: Critical / High / Medium / Low",
      "Estimate time required, difficulty, and expected impact",
    ],
  };
}

export function normalizeTarget(typeId: string, state: BuilderState): {
  raw: string;
  display: string;
  slug: string;
  hostish: string;
  url: string | null;
  notes: string[];
} {
  const t = TYPES[typeId] || TYPES.generic;
  const raw = cleanRaw(state.targetInput);
  const notes: string[] = [];

  let url: string | null = null;
  if (/^https?:\/\//i.test(raw)) {
    url = raw;
  } else if (/^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(raw)) {
    url = \`https://\${raw}\`;
  } else if (raw.startsWith("play.google.com/") || raw.startsWith("apps.apple.com/")) {
    url = \`https://\${raw}\`;
  }

  let display = raw;
  let slug = "target";
  let hostish = raw;

  if (url) {
    display = url;
    try {
      const u = new URL(url.startsWith("http") ? url : \`https://\${url}\`);
      hostish = u.hostname.replace(/^www\\./, "");
      slug = hostish.replace(/\\./g, "-");
    } catch {
      slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "target";
    }
  } else if (raw) {
    display = raw;
    slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "target";
    hostish = raw;
    if (["website", "saas", "landing", "ecommerce", "pwa", "api"].includes(typeId)) {
      notes.push("Primary target is not a full URL — agent should search public web for the official property and state assumptions.");
    }
  } else {
    display = typeId === "website" ? "https://example.com" : \`Unnamed \${t.short} product\`;
    slug = \`unnamed-\${typeId}\`;
    hostish = display;
    notes.push("No target provided — fail-safe placeholder used. Agent must ask for clarification only if completely blocked; otherwise produce a template audit framework and mark unknowns.");
  }

  return { raw, display, slug, hostish, url, notes };
}

export function brandName(target: { url: string | null; raw: string }): string {
  if (target.url) {
    try {
      const host = new URL(target.url).hostname.replace(/^www\\./, "");
      return host.replace(/\\.[a-z]{2,}$/i, "").replace(/[-_]/g, " ").replace(/\\b\\w/g, c => c.toUpperCase());
    } catch { /* fall through */ }
  }
  if (target.raw) {
    return target.raw
      .replace(/https?:\\/\\//i, "")
      .replace(/\\/.*$/, "")
      .replace(/[._-]+/g, " ")
      .replace(/\\bapp\\b/ig, "")
      .trim()
      .replace(/\\b\\w/g, c => c.toUpperCase()) || "the product";
  }
  return "the product";
}

export function resolveMarket(typeId: string, state: BuilderState): { market: string; assumed: boolean } {
  const t = TYPES[typeId] || TYPES.generic;
  const rawTarget = cleanRaw(state.targetInput).toLowerCase();

  const rules: [RegExp, string][] = [
    [/finance|bank|wallet|crypto|pay|tax|invoice/i, "fintech / financial services"],
    [/health|doctor|med|fitness|workout|calm|sleep|therapy/i, "digital health & wellness"],
    [/learn|edu|school|course|quiz|tutor|study/i, "edtech / online learning"],
    [/shop|store|cart|e-?commerce|merch|apparel/i, "e-commerce / retail"],
    [/game|play|rpg|arcade|puzzle|steam|itch/i, "gaming / interactive entertainment"],
    [/dev|code|sdk|api|log|monitor|deploy|cloud|git/i, "developer tools & infrastructure"],
    [/social|chat|community|feed|dating|creator/i, "social networking / creator economy"],
    [/job|career|work|hire|recruit|hr/i, "recruitment / career platform"],
    [/travel|hotel|flight|book|trip|guide/i, "travel & hospitality"],
    [/food|restaurant|menu|order|delivery|recipe/i, "food & dining"],
  ];
  for (const [rx, label] of rules) {
    if (rx.test(rawTarget)) return { market: label, assumed: true };
  }
  const defaultMarkets: Record<string, string> = {
    website: "general web / brand site",
    ios: "general consumer iOS app",
    android: "general consumer Android app",
    desktop: "general desktop utility / productivity software",
    saas: "B2B / B2C SaaS product",
    extension: "browser productivity / utility extension",
    api: "developer API / web service",
    landing: "product landing page / lead generation",
    ecommerce: "online retail / e-commerce store",
    game: "interactive video game / entertainment",
    pwa: "progressive web app (mobile/desktop)",
    generic: "digital product / software application",
  };
  return { market: defaultMarkets[typeId] || "digital product / service", assumed: true };
}

export function gatherDyn(typeId: string, state: BuilderState): [string, string][] {
  const t = TYPES[typeId] || TYPES.generic;
  const out: [string, string][] = [];
  const fields = t.fields || [];
  for (const f of fields) {
    const val = (state as any)[f.id];
    if (cleanRaw(val)) out.push([f.label, cleanRaw(val)]);
  }
  return out;
}
`;

fs.writeFileSync('/home/user/a-audit/src/domain/helpers.ts', helpersCode, 'utf8');
console.log('Generated src/domain/helpers.ts');
