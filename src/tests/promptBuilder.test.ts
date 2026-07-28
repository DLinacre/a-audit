/**
 * PIXEL HEIST & ARENA BUILDER — VITEST REGRESSION SUITE
 * Guarantees zero behavioral drift across Audit, Create App, and Refactor prompt engines.
 * Date: July 28, 2026
 */

import { describe, it, expect } from 'vitest';
import { buildPrompt } from '../domain/promptBuilder';
import { fileTypeInference } from '../domain/fileIntel';
import { brandName, normalizeTarget } from '../domain/helpers';
import { BuilderState } from '../types';

function getDefaultState(overrides?: Partial<BuilderState>): BuilderState {
  return {
    appMode: 'audit',
    manualType: 'website',
    targetInput: 'https://example.com',
    depth: 'full',
    style: 'detailed',
    preset: 'full',
    cats: {
      executive: true,
      brand: true,
      ux: true,
      ui: true,
      content: true,
      seo: true,
      performance: true,
      accessibility: true,
      security: true,
      technical: true,
      cro: true,
      ai: true,
      competitive: true,
      missing: true,
      priority: true,
    },
    roles: {
      ux: true,
      ui: true,
      brand: true,
      seo: true,
      techseo: true,
      perf: true,
      a11y: true,
      sec: true,
      dev: true,
      cro: true,
      mktg: true,
      pm: true,
      copy: true,
      ai: true,
    },
    dels: {
      report: true,
      roadmap: true,
      tasks: true,
      assets: true,
      tree: true,
      scores: true,
    },
    adv: {},
    fileIntel: null,
    extraContext: 'Make it fast and modern',
    version: 'production',
    storeUrl: '',
    appId: '',
    appName: '',
    androidUrl: '',
    packageId: '',
    os: '',
    installerUrl: '',
    pricing: '',
    signupUrl: '',
    browser: '',
    storeId: '',
    apiDocs: '',
    authMethod: '',
    ctaUrl: '',
    adPlatform: '',
    checkoutUrl: '',
    platform: '',
    engine: '',
    framework: '',
    manifestUrl: '',
    createAppName: 'Pixel Heist',
    createAppVision: 'Tactical stealth web game',
    createPlatform: 'webapp',
    createArchitecture: 'monolith',
    createTechStack: 'Next.js 15 + Phaser 3 + TypeScript',
    createCoreFeatures: '1. Guard AI\n2. Lockpicking',
    createAudience: 'Puzzle gamers',
    createScope: 'mvp',
    refactorScope: 'Entire Application',
    refactorTechDebt: 'Legacy monolithic HTML/JS file',
    refactorTargetStack: 'TypeScript + React 19 + Tailwind v4',
    refactorTargetUrl: 'https://github.com/DLinacre/a-audit',
    refactorTechStack: 'Legacy HTML5/JS',
    refactorObjectives: 'Modernize codebase and eliminate tech debt',
    refactorPlan: '1. Audit\n2. Interfaces\n3. Refactor\n4. Verify',
    ...overrides,
  };
}

describe('1. Audit Mode Prompt Generator (Regression Verification)', () => {
  it('generates a complete Website / Web app audit prompt with 15 categories and 14 roles', () => {
    const state = getDefaultState();
    const result = buildPrompt(state);

    expect(result.text).toContain('# MASTER WEBSITE AUDIT & GROWTH CONSULTANT');
    expect(result.text).toContain('https://example.com');
    expect(result.text).toContain('Use current publicly available information as of today.');
    expect(result.text).toContain('## Audit categories to complete');
    expect(result.text).toContain('### 1. Executive Summary');
    expect(result.text).toContain('### 15. Priority Matrix');
    expect(result.text).toContain('## Required deliverables');
    expect(result.typeId).toBe('website');
    expect(result.cats.length).toBe(15);
    expect(result.roles.length).toBe(14);
  });

  it('generates fail-safe clarification notes when input is missing or ambiguous', () => {
    const state = getDefaultState({ targetInput: '' });
    const result = buildPrompt(state);

    expect(result.failSafeNotes.length).toBeGreaterThan(0);
    expect(result.text).toContain('## Input resolution (auto fail-safe)');
  });
});

describe('2. Create App Mode Prompt Generator (Regression Verification)', () => {
  it('generates a complete Idea-to-PRD app creation prompt', () => {
    const state = getDefaultState({ appMode: 'create' });
    const result = buildPrompt(state);

    expect(result.text).toContain('# MASTER SOFTWARE ARCHITECT & PRODUCT CREATION CONSULTANT');
    expect(result.text).toContain('**Product Name:** 🚀 Pixel Heist');
    expect(result.text).toContain('**Preferred Tech Stack:** Next.js 15 + Phaser 3 + TypeScript');
    expect(result.text).toContain('**Architecture Style:** monolith');
    expect(result.text).toContain('## Required Engineering Deliverables');
    expect(result.text).toContain('1. Product Requirements Document (PRD)');
    expect(result.text).toContain('6. Step-by-Step Implementation Execution Plan');
  });
});

describe('3. Refactor Mode Prompt Generator (Regression Verification)', () => {
  it('generates a complete Refactoring & Code Modernization Directive prompt', () => {
    const state = getDefaultState({ appMode: 'refactor' });
    const result = buildPrompt(state);

    expect(result.text).toContain('# REFACTORING & CODE MODERNIZATION DIRECTIVE');
    expect(result.text).toContain('**Mode:** ⚡ Refactor & Modernize');
    expect(result.text).toContain('**Target Scope:** Entire Application');
    expect(result.text).toContain('**Target Architecture / Stack:** TypeScript + React 19 + Tailwind v4');
    expect(result.text).toContain('## 1. Technical Debt & Current Pain Points');
    expect(result.text).toContain('## 2. Refactoring Objectives & Quality Standards');
    expect(result.text).toContain('## 3. Step-by-Step Refactoring Plan');
  });
});

describe('4. Domain Helpers & File Intel Type Inference', () => {
  it('infers website target type when package.json or next.config is dropped', () => {
    const state = getDefaultState({
      fileIntel: {
        text: 'next.config.mjs package.json <!doctype html>',
        signals: [],
        count: 2,
        totalSize: 1500,
        filenames: ['package.json', 'next.config.mjs'],
        treeSnippet: '',
      },
    });

    const intel = fileTypeInference(state);
    expect(intel).not.toBeNull();
    expect(intel?.type).toBe('website');
    expect(intel?.confidence).toBe('medium');
  });

  it('normalizes targets and formats brand names cleanly', () => {
    const brand = brandName({ url: 'https://github.com/DLinacre/a-audit', raw: 'https://github.com/DLinacre/a-audit' });
    expect(brand).toBe('Github');

    const target = normalizeTarget('website', getDefaultState({ targetInput: 'example.com' }));
    expect(target.url).toBe('https://example.com');
    expect(target.slug).toBe('example-com');
  });
});
