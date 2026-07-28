/**
 * PIXEL HEIST & ARENA BUILDER — FILE INTEL & TYPE INFERENCE ENGINE
 * Pure TypeScript domain functions for file analysis and type detection.
 * Date: July 28, 2026
 */

import { TYPES } from './constants';
import { TargetTypeId, BuilderState, ResolvedType } from '../types';
import { cleanRaw } from './helpers';

export function fileTypeInference(state: BuilderState): {
  type: TargetTypeId;
  score: number;
  confidence: 'high' | 'medium' | 'low';
  tie: boolean;
  reasons: string[];
  why: string;
} | null {
  const intel = state.fileIntel || { text: "", signals: [], count: 0, totalSize: 0, filenames: [], treeSnippet: "" };
  const blob = `${intel.text || ""} ${(intel.signals || []).join(" ")}`.toLowerCase();
  const scores: Record<string, number> = {
    website: 0, ios: 0, android: 0, desktop: 0, saas: 0, extension: 0, api: 0, landing: 0, ecommerce: 0, game: 0, pwa: 0, generic: 0
  };
  const reasons: Record<string, string[]> = {};
  const add = (id: string, n: number, rx: RegExp, reason: string) => {
    if (rx.test(blob)) {
      scores[id] = (scores[id] || 0) + n;
      (reasons[id] ||= []).push(reason);
    }
  };

  add("android", 8, /androidmanifest\.xml|build\.gradle|settings\.gradle|\.apk\b|\.aab\b|applicationid|com\.android\./, "Android manifest, Gradle, package, or APK/AAB signal");
  add("ios", 8, /\.xcodeproj|\.xcworkspace|info\.plist|podfile|swiftui|uikit|\.ipa\b/, "Xcode, Info.plist, Swift, UIKit, or IPA signal");
  add("extension", 10, /manifest\.json|manifest_version|chrome\.runtime|browser_action|chrome_extension/, "extension manifest or browser-runtime signal");
  add("pwa", 8, /manifest\.webmanifest|service-worker|serviceworker|workbox|display\s*[:=]\s*["']standalone/, "web manifest, service-worker, or installability signal");
  add("api", 8, /openapi\s*[:=]|swagger|asyncapi|paths\s*:\s*\{|graphql|postman_collection/, "OpenAPI, Swagger, GraphQL, or API-collection signal");
  add("desktop", 7, /electron|tauri|\.exe\b|\.dmg\b|\.appimage\b|wails|nw\.js/, "Electron, Tauri, installer, or desktop-runtime signal");
  add("game", 8, /unity|unrealengine|godot|\.uproject|project\.godot/, "Unity, Unreal, or Godot signal");
  add("ecommerce", 6, /shopify|woocommerce|product\.json|add to cart|cart\.js/, "Shopify, WooCommerce, product, or cart signal");
  add("saas", 4, /stripe|subscription|multi-tenant|workspace/, "subscription, billing, tenancy, or workspace signal");
  add("website", 7, /<!doctype html|<html|next\.config|vite\.config|astro\.config/, "HTML document or web-project configuration signal");

  const ranking = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);
  if (!ranking.length) return null;

  const [typeStr, score] = ranking[0];
  const type = typeStr as TargetTypeId;
  const runnerUp = ranking[1];
  const runnerUpScore = runnerUp ? runnerUp[1] : 0;
  const confidence =
    score >= 8 && (!runnerUp || score - runnerUpScore >= 3)
      ? "high"
      : score >= 5
      ? "medium"
      : "low";
  const tie = Boolean(runnerUp && score - runnerUpScore < 3);
  const topReasons = reasons[type] || [];
  return {
    type,
    score,
    confidence,
    tie,
    reasons: topReasons,
    why: `${confidence} confidence: ${topReasons.join("; ")}${
      tie && runnerUp && TYPES[runnerUp[0]]
        ? "; close to " + TYPES[runnerUp[0]].short + " — verify manually"
        : ""
    }`,
  };
}

export function detectTypeFromInputs(state: BuilderState): {
  type: TargetTypeId;
  why: string;
  confidence?: 'high' | 'medium' | 'low';
  tie?: boolean;
  reasons?: string[];
} {
  const raw = cleanRaw(state.targetInput).toLowerCase();
  const extra = cleanRaw(state.extraContext).toLowerCase();
  const dynVals = [
    state.version, state.storeUrl, state.appId, state.appName, state.androidUrl,
    state.packageId, state.os, state.installerUrl, state.pricing, state.signupUrl,
    state.browser, state.storeId, state.apiDocs, state.authMethod, state.ctaUrl,
    state.adPlatform, state.checkoutUrl, state.platform, state.engine, state.framework, state.manifestUrl
  ].map(s => cleanRaw(s).toLowerCase());

  const blob = [raw, extra, ...dynVals].join(" ");

  if (/apps\.apple\.com|itunes\.apple\.com|testflight\.apple/.test(blob)) return { type: "ios", why: "App Store / TestFlight URL detected" };
  if (/play\.google\.com\/store|market:\/\/details/.test(blob)) return { type: "android", why: "Google Play URL detected" };
  if (/chromewebstore\.google\.com|addons\.mozilla\.org/.test(blob)) return { type: "extension", why: "Browser extension store URL detected" };
  if (/store\.steampowered\.com|epicgames\.com|itch\.io/.test(blob)) return { type: "game", why: "Game store URL detected" };

  if (/\.apk\b|\.aab\b|package\s*name|applicationid/.test(blob)) return { type: "android", why: "APK/AAB or package signals detected" };
  if (/\.ipa\b|bundle\s*id|ios\s*app|iphone|ipad/.test(blob) && !/android/.test(blob)) return { type: "ios", why: "iOS package / platform signals detected" };
  if (/\.exe\b|\.msi\b|\.dmg\b|\.appimage\b|\.deb\b|\.pkg\b|windows\s*app|macos\s*app|desktop\s*app/.test(blob)) return { type: "desktop", why: "Desktop installer/executable signals detected" };

  const targetClean = cleanRaw(state.targetInput);
  if (
    /^(com|org|net|io|gov|edu|uk|de|fr|us)\.[a-z0-9_]+(\.[a-z0-9_]+)+$/i.test(targetClean) &&
    !/\.(com|org|net|io|co|us|uk|de|fr|eu|xyz|site|page)$/i.test(targetClean)
  ) {
    return { type: "android", why: "Looks like an Android package name" };
  }

  if (/\b(ios|iphone|ipad|app store|testflight|swiftui|uikit)\b/.test(blob)) return { type: "ios", why: "iOS keywords in inputs" };
  if (/\b(android|play store|kotlin|jetpack)\b/.test(blob)) return { type: "android", why: "Android keywords in inputs" };
  if (/\b(extension|chrome extension|firefox add-?on|manifest v3)\b/.test(blob)) return { type: "extension", why: "Extension keywords in inputs" };
  if (/\b(api|openapi|swagger|developer portal|sdk)\b/.test(blob) && !/\bwebsite\b/.test(blob)) return { type: "api", why: "API/DX keywords in inputs" };
  if (/\b(saas|subscription|b2b software|workspace app)\b/.test(blob)) return { type: "saas", why: "SaaS keywords in inputs" };
  if (/\b(shopify|woocommerce|add to cart|checkout|e-?commerce)\b/.test(blob)) return { type: "ecommerce", why: "E-commerce keywords in inputs" };
  if (/\b(landing page|waitlist|coming soon|launch page)\b/.test(blob)) return { type: "landing", why: "Landing-page keywords in inputs" };
  if (/\b(pwa|progressive web app|service worker|web app manifest)\b/.test(blob)) return { type: "pwa", why: "PWA keywords in inputs" };
  if (/\b(game|gameplay|steam|early access)\b/.test(blob)) return { type: "game", why: "Game keywords in inputs" };
  if (/\b(desktop|windows app|mac app|electron)\b/.test(blob)) return { type: "desktop", why: "Desktop keywords in inputs" };

  const fileInference = fileTypeInference(state);
  if (fileInference) return fileInference;

  if (/(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/|\s|$)/i.test(raw) || raw.includes(".")) {
    if (/docs\.|developer\.|api\./i.test(raw)) return { type: "api", why: "Docs/API hostname pattern" };
    if (/app\.|dashboard\.|console\./i.test(raw)) return { type: "saas", why: "App/dashboard hostname pattern" };
    if (/shop\.|store\./i.test(raw)) return { type: "ecommerce", why: "Shop/store hostname pattern" };
    return { type: "website", why: "Domain/URL detected — defaulting to website" };
  }

  if (raw) return { type: "generic", why: "Name-only target — using generic digital product audit" };
  return { type: "website", why: "No strong signals — fail-safe default: website" };
}

export function resolveType(state: BuilderState): ResolvedType {
  if (state.manualType && state.manualType !== "auto") {
    return { type: state.manualType, why: "Manually selected", source: "manual" };
  }
  const d = detectTypeFromInputs(state);
  return { ...d, source: "detected" };
}
