/**
 * PIXEL HEIST & ARENA BUILDER — PROMPT GENERATION ENGINE
 * 100% pure, deterministic prompt builder for Audit, Create App, and Refactor modes.
 * Zero DOM side-effects, zero global mutable state.
 * Date: July 28, 2026
 */

import { TYPES, CATEGORIES, ROLES, DELIVERABLES, ADVANCED, DEPTH_HINTS, STYLE_HINTS } from './constants';
import { BuilderState, PromptResult, TargetTypeId, CategoryItem, RoleItem } from '../types';
import { cleanRaw, normalizeTarget, brandName, resolveMarket, gatherDyn, relevantCategories, relevantRoles, selectedList, catBodiesFor } from './helpers';
import { resolveType } from './fileIntel';

export function buildPrompt(state: BuilderState): PromptResult {
  const attachments = state.attachments || [];
  
    if (state.appMode === "create") {
      const appName = cleanRaw(state.createAppName) || "New Digital App";
      const appVision = cleanRaw(state.createAppVision) || "Build a modern, scalable, high-performance digital product.";
      const platform = state.createPlatform || "webapp";
      const arch = state.createArchitecture || "monolith";
      const stack = cleanRaw(state.createTechStack) || "Modern Web Stack (HTML5/CSS3/JavaScript, Node.js or Python backend)";
      const features = cleanRaw(state.createCoreFeatures) || "1. User onboarding & authentication\n2. Primary dashboard & core workflow\n3. Settings & data management";
      const audience = cleanRaw(state.createAudience) || "General digital users and professionals";
      const scope = state.createScope || "mvp";
      const scopeLabel = { mvp: "Single-Page Core MVP", full: "Full-Stack Core Product MVP", enterprise: "Enterprise System Specification" }[scope];

      const lines: string[] = [
        `# MASTER SOFTWARE ARCHITECT & PRODUCT CREATION CONSULTANT`,
        ``,
        `**Product Name:** 🚀 ${appName}`,
        `**Target Platform:** ${platform.toUpperCase()}`,
        `**Preferred Tech Stack:** ${stack}`,
        `**Architecture Style:** ${arch}`,
        `**MVP Target Scope:** ${scopeLabel}`,
        `**Target Audience:** ${audience}`,
        `**Date context:** Build according to current production software standards.`,
        ``,
        `---`,
        ``,
        `## Mission`,
        `Act as a Principal Systems Architect, Lead UX/UI Designer, and Staff Software Engineer to build **${appName}** from scratch.`,
        ``,
        `## Product Vision & Pitch`,
        appVision,
        ``,
        `## Core Feature Backlog`,
        features,
        ``,
        `## Required Engineering Deliverables`,
        `- **1. Product Requirements Document (PRD):** Comprehensive breakdown of user personas, core journeys, and functional specs.`,
        `- **2. System Architecture & Folder Tree:** Canonical project structure, dependency manifest, and module boundaries.`,
        `- **3. Database Schema & Data Models:** Complete entity-relationship diagram / SQL schema definitions.`,
        `- **4. API & Interface Specifications:** Endpoints, request/response formats, state management, and UI component hierarchy.`,
        `- **5. Security, Auth & Quality Standards:** Input validation, secret distribution, access control, and testing strategy.`,
        `- **6. Step-by-Step Implementation Execution Plan:** Phase 1 (Core Foundation) → Phase 2 (Feature Implementation) → Phase 3 (Polish & Deployment).`,
        ``,
        `## Execution & Code Generation Rules`,
        `- Produce production-grade, self-contained, working code files without placeholders or omitted methods.`,
        `- Follow modular, clean code principles with comprehensive inline documentation.`,
        `- Write complete files directly to the workspace structure when instructed.`,
        ``,
        `Begin architecting and constructing **${appName}** now.`
      ];

      return {
        text: lines.join("\n"),
        resolved: { source: "manual", type: platform },
        target: { display: appName, slug: appName.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
        typeId: platform,
        name: appName,
        cats: [{ id: "prd", name: "PRD & Vision" }, { id: "arch", name: "Architecture" }, { id: "db", name: "Data Schema" }, { id: "api", name: "API & UI Specs" }, { id: "plan", name: "Implementation Plan" }],
        roles: [{ id: "arch", name: "Principal Architect" }, { id: "eng", name: "Lead Software Engineer" }, { id: "designer", name: "Lead UX/UI Designer" }, { id: "sec", name: "Security Engineer" }],
        failSafeNotes: []
      };
    }

    if (state.appMode === "refactor") {
      const scope = cleanRaw(state.refactorScope) || "Entire Application / Core Modules";
      const techDebt = cleanRaw((state.refactorTechDebt || 'Legacy code patterns, technical debt, unhandled errors, and performance bottlenecks.')) || "Legacy code patterns, technical debt, unhandled errors, and performance bottlenecks.";
      const targetStack = cleanRaw((state.refactorTargetStack || 'TypeScript + React 19 + Tailwind v4 + Clean Modular Architecture')) || "TypeScript + React 19 + Tailwind v4 + Clean Modular Architecture";

      const lines: string[] = [
        `# REFACTORING & CODE MODERNIZATION DIRECTIVE`,
        ``,
        `**Mode:** ⚡ Refactor & Modernize`,
        `**Target Scope:** ${scope}`,
        `**Target Architecture / Stack:** ${targetStack}`,
        `**Date Context:** ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
        ``,
        `---`,
        ``,
        `## 1. Technical Debt & Current Pain Points`,
        techDebt,
        ``,
        `## 2. Refactoring Objectives & Quality Standards`,
        `- **Modernize Code Base:** Convert legacy code patterns to clean, idiomatic ${targetStack}.`,
        `- **Eliminate Tech Debt:** Fix memory leaks, unhandled exceptions, circular dependencies, and anti-patterns.`,
        `- **Preserve API & Behavioral Contracts:** Ensure zero breaking changes to public function signatures, external APIs, or user-facing behavior.`,
        `- **Enhance Performance & Stability:** Optimize memory usage, minimize CPU overhead, reduce bundle size, and improve load times.`,
        `- **Type Safety & Testing:** Introduce strict TypeScript interfaces and establish unit test verification.`,
        ``,
        `## 3. Step-by-Step Refactoring Plan`,
        `1. **Audit & Analysis Phase:** Map current dependencies, identify side-effects, and isolate unit bounds.`,
        `2. **Interface & Contract Definition:** Establish clean TypeScript interfaces and typed state contracts.`,
        `3. **Incremental Refactoring:** Transform components/modules one section at a time, preserving backwards compatibility.`,
        `4. **Verification & Regression Testing:** Execute unit/integration tests and inspect logs to guarantee zero regressions.`,
        ``,
        `Begin refactoring and modernizing **${scope}** now.`
      ];

      return {
        text: lines.join("\n"),
        resolved: { source: "manual", type: "refactor" },
        target: { display: scope, slug: scope.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
        typeId: "refactor",
        name: scope,
        cats: [{ id: "refactor", name: "Refactor Scope" }, { id: "techdebt", name: "Tech Debt" }],
        roles: [{ id: "arch", name: "Refactoring Architect" }, { id: "dev", name: "Senior Developer" }],
        failSafeNotes: []
      };
    }

    const resolved = resolveType(state);
    const typeId = resolved.type;
    const t = TYPES[typeId] || TYPES.generic;
    const target = normalizeTarget(typeId, state);
    const name = brandName(target);
    const market = resolveMarket(typeId, state);
    const extra = cleanRaw(state.extraContext);
    const dyn = gatherDyn(typeId, state);

    // Fail-safe: if user cleared all categories/roles, re-expand to relevant defaults for the prompt only
    let cats = selectedList(state.cats, relevantCategories(typeId));
    let roles = selectedList(state.roles, relevantRoles(typeId));
    const dels = selectedList(state.dels, DELIVERABLES);
    const adv = state.adv;

    const failSafeNotes = [];
    if (!cats.length) {
      cats = relevantCategories(typeId);
      failSafeNotes.push("No categories were selected — auto-included all relevant categories for this product type.");
    }
    if (!roles.length) {
      roles = relevantRoles(typeId).slice(0, 8);
      failSafeNotes.push("No expert roles selected — auto-included a core expert team for this product type.");
    }
    if (!dels.length) {
      failSafeNotes.push("No deliverables selected — defaulting to a clear written audit with prioritised next steps.");
    }
    target.notes.forEach(n => failSafeNotes.push(n));
    if (!cleanRaw((state.productName || ''))) failSafeNotes.push(`Product name auto-derived as “${name}”.`);
    if (!cleanRaw((state.market || ''))) failSafeNotes.push(`Market auto-assumed as “${market}” (override if wrong).`);
    if (resolved.source === "auto") failSafeNotes.push(`Product type auto-detected as **${t.label}** (${resolved.why}).`);

    const depthLabel = { focused: "Focused", full: "Full professional", forensic: "Forensic / exhaustive" }[state.depth];
    const styleLabel = { concise: "concise and executive", detailed: "detailed and structured", agent: "maximum agent-executable structure" }[state.style];
    const bodies = catBodiesFor(typeId, name);

    const lines: string[] = [];
    const H = (x: any) => lines.push(`\n## ${x}`);
    const P = (x: any) => lines.push(x);
    const B = (x: any) => lines.push(`- ${x}`);

    P(`# ${t.title}`);
    P(``);
    P(`**Target type:** ${t.icon} ${t.label}`);
    P(`**Target:** ${target.display}`);
    P(`**Product / brand name:** ${name}`);
    P(`**Market / niche:** ${market}`);
    if (dyn.storeUrl) P(`**Store listing:** ${dyn.storeUrl}`);
    if (dyn.packageId) P(`**Package name:** ${dyn.packageId}`);
    if (dyn.bundleId) P(`**Bundle ID:** ${dyn.bundleId}`);
    if (dyn.apkName) P(`**APK / AAB:** ${dyn.apkName}`);
    if (dyn.exeName) P(`**Executable / installer:** ${dyn.exeName}`);
    if (dyn.os) P(`**Target OS:** ${dyn.os}`);
    if (dyn.platforms) P(`**Platforms / devices:** ${dyn.platforms}`);
    if (dyn.browsers) P(`**Browsers:** ${dyn.browsers}`);
    if (dyn.docsUrl) P(`**Docs:** ${dyn.docsUrl}`);
    if (dyn.statusUrl) P(`**Status page:** ${dyn.statusUrl}`);
    if (dyn.pricingUrl) P(`**Pricing:** ${dyn.pricingUrl}`);
    if (dyn.distUrl) P(`**Download / product URL:** ${dyn.distUrl}`);
    if (dyn.platform) P(`**Commerce platform:** ${dyn.platform}`);
    if (dyn.goal) P(`**Primary conversion goal:** ${dyn.goal}`);
    if (dyn.version) P(`**Version / focus:** ${dyn.version}`);
    P(`**Audit depth:** ${depthLabel}`);
    P(`**Output style:** ${styleLabel}`);
    P(`**Date context:** Use current publicly available information as of today.`);
    P(``);
    P(`---`);
    P(``);

    if (failSafeNotes.length) {
      P(`## Input resolution (auto fail-safe)`);
      P(``);
      P(`Some inputs were missing, ambiguous, or left on Auto. The following resolutions were applied so work can proceed:`);
      P(``);
      failSafeNotes.forEach(B);
      P(``);
      P(`If any resolution is wrong, correct it in the final report assumptions section and continue.`);
      P(``);
    }

    P(`## Mission`);
    P(``);
    P(`Perform a complete professional audit of **${target.display}** (${t.label}) as if you were a multi-disciplinary team consisting of:`);
    P(``);
    roles.forEach(r => B(r.name));
    P(``);
    P(`Your objective is **not** simply to list problems.`);
    P(`Your objective is to create a practical roadmap that transforms **${name}** into a ${t.transform}.`);
    P(``);

    if (extra) {
      P(`## Additional context from the requester`);
      P(``);
      P(extra);
      P(``);
    }

    if (attachments.length) {
      H(`Local evidence supplied`);
      P(``);
      P(`The requester selected **${attachments.length} local file(s)** for browser-side classification. Treat this manifest as supplemental evidence; do not claim to have executed, uploaded, or reverse-engineered any binary. The requester must separately attach source files to the Agent workspace before requesting file edits.`);
      P(``);
      attachments.slice(0, 35).forEach(f => B(`${f.path} (${Math.max(1, Math.round(f.size / 1024))} KB)`));
      if (attachments.length > 35) B(`…and ${attachments.length - 35} further local files.`);
      const htmlSources = attachments.filter(f => /\.html?$/i.test(f.name));
      if (htmlSources.length) {
        P(``);
        P(`**Existing-source preservation rule:** This audit includes HTML source (${htmlSources.map((f: any) => "[" + f.path + "]").join(", ")}). When source is available in the workspace, preserve it as self-contained HTML unless the requester explicitly asks for a different architecture. Return a complete updated HTML file or a precise patch; do not convert the implementation into Markdown, pseudo-code, or a framework by default.`);
      }
      P(``);
    }

    H(`Hard constraints`);
    if (adv.publicOnly) {
      B(`Use **only publicly available** information. Never invent metrics, rankings, private app internals, crash-free rates, or business facts.`);
      B(`Whenever something cannot be verified, explicitly write: **"Unable to verify from public sources."**`);
    }
    B(`Clearly distinguish **observations** from **recommendations**.`);
    if (adv.noOffense) {
      B(`Security review must be **defensive only**. Do **not** reverse engineer binaries (APK/IPA/EXE), crack licenses, bypass DRM, or recommend offensive testing.`);
    }
    B(`Base recommendations on current industry standards appropriate to this product type: ${t.standards || "modern UX, accessibility, security hygiene, and conversion best practices"}.`);
    if (adv.implementable) B(`Deliverables must be detailed enough that a professional developer, designer, or AI coding agent can start implementing immediately without further clarification.`);
    if (adv.failSafe) {
      B(`If inputs are incomplete, still produce the best possible audit from available public signals. State assumptions. Do not refuse the task due to missing optional fields.`);
    }
    if (adv.multiSurface) {
      B(`If the target links to related public surfaces (marketing site, store listing, docs, status page), include them when relevant.`);
    }
    P(``);

    H(`Research scope`);
    P(``);
    P(`Audit the publicly accessible experience of **${target.display}**, covering:`);
    P(``);
    (t.scope || TYPES.generic.scope).forEach(B);
    P(``);
    P(t.discover || TYPES.generic.discover);
    P(``);

    H(`Audit categories to complete`);
    P(``);
    P(`Produce detailed findings for **each selected category** below. Score each completed category out of 100.`);
    P(``);

    cats.forEach((c, idx) => {
      P(`### ${idx + 1}. ${c.name}`);
      P(``);
      P(`Evaluate:`);
      (bodies[c.id] || [c.desc]).forEach(B);
      P(``);
    });

    if (adv.evidence) {
      H(`Issue reporting format`);
      P(``);
      P(`For every material issue, include:`);
      [
        "**Description** — what is wrong",
        "**Evidence** — URL, store listing element, screenshot description, public policy text, or other public signal",
        "**Why it matters**",
        "**Business impact**",
        "**Technical / product impact**",
        "**Recommended solution**",
        "**Difficulty** (S/M/L)",
        "**Priority** (Critical/High/Medium/Low)",
        "**Expected improvement**",
      ].forEach(B);
      P(``);
    }

    H(`Scoring`);
    P(``);
    P(`Score each completed category out of 100. Also provide:`);
    B(`Overall ${t.noun} score`);
    cats.forEach(c => B(`${c.name} score`));
    P(``);

    H(`Required deliverables`);
    P(``);
    if (dels.length) dels.forEach(d => B(d.name));
    else B("A clear written audit with prioritised next steps");
    P(``);

    if (!dels.length || dels.some(d => d.id === "action")) {
      P(`### Action plan structure`);
      P(``);
      B("**Immediate (Today)** — quick wins");
      B("**Short term (1–2 weeks)** — high-value improvements");
      B("**Medium term (1–3 months)** — larger enhancements");
      B("**Long term** — strategic roadmap");
      P(``);
    }

    if (!dels.length || dels.some(d => d.id === "tasks")) {
      P(`### Task format (GitHub Issues style)`);
      P(``);
      P(`For each task include: **Title**, **Description**, **Acceptance criteria**, **Priority**, **Estimated effort**, **Owner discipline** (design / eng / content / growth).`);
      P(``);
    }

    if (!dels.length || dels.some(d => d.id === "assets" || d.id === "snippets")) {
      P(`### Ready-to-implement assets`);
      P(``);
      P(`Where possible, generate production-ready content such as:`);
      (t.assets || TYPES.generic.assets).forEach(B);
      P(``);
    }

    if ((!dels.length || dels.some(d => d.id === "zip")) || adv.workspace) {
      P(`### Workspace / package structure`);
      P(``);
      if (adv.workspace) {
        P(`Create these as real files in the workspace (Markdown / text / code as appropriate), not only as chat text:`);
      } else {
        P(`Propose this package structure and include generated file contents in the appropriate places:`);
      }
      P(``);
      P("```");
      P(`/audit-${target.slug}/`);
      P(`├── README.md`);
      P(`├── Executive-Summary.md`);
      P(`├── Full-Audit.md`);
      P(`├── Priority-Roadmap.md`);
      P(`├── Developer-Tasks.md`);
      P(`├── Assumptions-and-Gaps.md`);
      (t.folders || TYPES.generic.folders).forEach((f: any, i: number, arr: any[]) => {
        P(`${i === arr.length - 1 ? "└" : "├"}── ${f}/`);
      });
      P("```");
      P(``);
    }

    if (state.style === "concise") {
      H(`Brevity rule`);
      P(``);
      P(`Prefer short bullets and tables over long prose. Lead with scores and Critical/High items. Still include enough evidence to be actionable.`);
      P(``);
    } else if (state.style === "agent") {
      H(`Agent execution rules`);
      P(``);
      [
        "Work methodically; use tools to fetch public pages, store listings, and docs when available.",
        "Write findings into workspace files as you go when practical.",
        "Prefer concrete patches, copy blocks, and checklists over vague advice.",
        "Every recommendation should have a clear owner action (content, design, engineering, or growth).",
        "If a check cannot be completed from public signals, mark it and continue.",
        "End with a short “Start here” checklist of the first 5 implementation steps.",
      ].forEach(B);
      P(``);
    }

    if (state.depth === "forensic") {
      H(`Forensic depth requirements`);
      P(``);
      [
        "Note surface-level issues with URLs or listing field names wherever possible.",
        "Call out edge cases (empty states, permission denials, 404s, failed forms, offline states).",
        "Separate confirmed vs suspected issues.",
        "Include both quick wins and structural fixes.",
      ].forEach(B);
      P(``);
    } else if (state.depth === "focused") {
      H(`Focus rule`);
      P(``);
      P(`Stay tightly scoped to the selected categories. Skip unselected areas except where they directly block a selected finding.`);
      P(``);
    }

    if (adv.screenshots) {
      H(`Visual annotation style`);
      P(``);
      P(`When describing UI/UX issues, write as if annotating screenshots: location on screen, what the user sees, and the exact change recommended.`);
      P(``);
    }

    // Type-specific closing guardrails
    if (typeId === "android" || typeId === "ios" || typeId === "desktop") {
      H(`Binary / package boundary`);
      P(``);
      P(`You may reference public package names, versions, store metadata, and user-visible behaviour. You must not request or perform disassembly, decompilation, or runtime instrumentation of APK/IPA/EXE files.`);
      P(``);
    }

    H(`Success criteria`);
    P(``);
    P(`The final deliverable should enable immediate implementation: prioritised roadmap, evidence-backed findings, scores, and production-ready snippets/files where selected — even when some inputs were auto-resolved.`);
    P(``);
    P(`Begin the audit of **${target.display}** (${t.label}) now.`);

    return {
      text: lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n",
      resolved,
      target,
      typeId,
      name,
      cats,
      roles,
      failSafeNotes,
    };
  }

  /* ═══════════════════════════════════════════════════════════════
     OPT-IN LOCAL SETTINGS (never stores file data)
     ═══════════════════════════════════════════════════════════════ */
  const LOCAL_SETTINGS_KEY = "arena-audit-builder.settings.v1";
  const LOCAL_CONSENT_KEY = "arena-audit-builder.save-settings.v1";
