/**
 * PIXEL HEIST & ARENA BUILDER — STATE MANAGEMENT HOOK
 * 100% type-safe React 19 hook managing BuilderState, presets, and selections.
 * Date: July 28, 2026
 */

import { useState, useCallback } from 'react';
import {
  BuilderState,
  AppMode,
  TargetTypeId,
  FileIntelResult,
} from '../types';
import { CATEGORIES, ROLES, DELIVERABLES, PRESET_DEFS } from '../domain/constants';
import { typeApplies } from '../domain/helpers';

export function getInitialBuilderState(): BuilderState {
  const cats: Record<string, boolean> = {};
  CATEGORIES.forEach((c) => {
    cats[c.id] = true;
  });

  const roles: Record<string, boolean> = {};
  ROLES.forEach((r) => {
    roles[r.id] = true;
  });

  const dels: Record<string, boolean> = {};
  DELIVERABLES.forEach((d) => {
    dels[d.id] = d.default !== false;
  });

  const adv: Record<string, boolean> = {};

  return {
    appMode: 'audit',
    manualType: 'auto',
    targetInput: '',
    depth: 'full',
    style: 'detailed',
    preset: 'master',
    cats,
    roles,
    dels,
    adv,
    fileIntel: null,
    attachments: [],
    extraContext: '',

    // Audit Dynamic Fields
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

    // Create App Fields
    createAppName: 'Pixel Heist',
    createAppVision: 'Sneak through procedurally generated buildings, avoid guards, hack security systems, and escape with as much loot as possible before time runs out.',
    createPlatform: 'webapp',
    createArchitecture: 'monolith',
    createTechStack: 'Next.js 15 + Phaser 3 + TypeScript',
    createCoreFeatures: '1. Procedural facility generation\n2. Guard AI with field-of-view raycasting\n3. Interactive lockpicking minigames\n4. Gadget arsenal (EMP, Decoy, Smoke, Sprint)\n5. HMAC-SHA256 verified leaderboards',
    createAudience: 'Puzzle gamers, tactical stealth and strategy enthusiasts',
    createScope: 'mvp',

    // Refactor Fields
    refactorScope: 'Entire Application / Core Modules',
    refactorTechDebt: 'Legacy code patterns, technical debt, unhandled errors, and performance bottlenecks.',
    refactorTargetStack: 'TypeScript + React 19 + Tailwind v4 + Clean Modular Architecture',
    refactorTargetUrl: 'https://github.com/DLinacre/a-audit',
    refactorTechStack: 'Legacy HTML5/JS monolithic file',
    refactorObjectives: 'Convert legacy code patterns to clean, idiomatic TypeScript + React 19 + Tailwind v4 + Clean Modular Architecture; eliminate technical debt; guarantee zero breaking changes.',
    refactorPlan: '1. Audit & Analysis Phase\n2. Interface & Contract Definition\n3. Incremental Refactoring\n4. Verification & Regression Testing',
  };
}

export function useBuilderState() {
  const [state, setState] = useState<BuilderState>(getInitialBuilderState);

  const setAppMode = useCallback((appMode: AppMode) => {
    setState((prev) => ({ ...prev, appMode }));
  }, []);

  const setManualType = useCallback((manualType: TargetTypeId) => {
    setState((prev) => ({ ...prev, manualType }));
  }, []);

  const setTargetInput = useCallback((targetInput: string) => {
    setState((prev) => ({ ...prev, targetInput }));
  }, []);

  const setDepth = useCallback((depth: 'focused' | 'full' | 'forensic') => {
    setState((prev) => ({ ...prev, depth }));
  }, []);

  const setStyle = useCallback((style: 'concise' | 'detailed' | 'agent') => {
    setState((prev) => ({ ...prev, style }));
  }, []);

  const setField = useCallback(<K extends keyof BuilderState>(key: K, value: BuilderState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleCategory = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      cats: { ...prev.cats, [id]: !prev.cats[id] },
    }));
  }, []);

  const toggleRole = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      roles: { ...prev.roles, [id]: !prev.roles[id] },
    }));
  }, []);

  const toggleDeliverable = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      dels: { ...prev.dels, [id]: !prev.dels[id] },
    }));
  }, []);

  const toggleAdv = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      adv: { ...prev.adv, [id]: !prev.adv[id] },
    }));
  }, []);

  const applyPreset = useCallback((presetId: string, typeId: string) => {
    const preset = PRESET_DEFS.find((p) => p.id === presetId);
    if (!preset) return;

    setState((prev) => {
      const nextCats = { ...prev.cats };
      const nextRoles = { ...prev.roles };

      CATEGORIES.forEach((c) => {
        const relevant = typeApplies((c as any).types || c.appliesTo, typeId);
        if (!relevant) {
          nextCats[c.id] = false;
          return;
        }
        if (preset.cats) {
          nextCats[c.id] = preset.cats.includes(c.id);
        } else {
          nextCats[c.id] = true;
        }
      });

      ROLES.forEach((r) => {
        const relevant = typeApplies((r as any).types || r.appliesTo, typeId);
        if (!relevant) {
          nextRoles[r.id] = false;
          return;
        }
        if (preset.roles) {
          nextRoles[r.id] = preset.roles.includes(r.id);
        } else {
          nextRoles[r.id] = true;
        }
      });

      return {
        ...prev,
        preset: presetId,
        cats: nextCats,
        roles: nextRoles,
      };
    });
  }, []);

  const handleFilesUploaded = useCallback((fileIntel: FileIntelResult | null, attachments?: Array<{ name: string; path: string; size: number; type: string }>) => {
    setState((prev) => ({
      ...prev,
      fileIntel,
      attachments: attachments || [],
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState(getInitialBuilderState());
  }, []);

  return {
    state,
    setAppMode,
    setManualType,
    setTargetInput,
    setDepth,
    setStyle,
    setField,
    toggleCategory,
    toggleRole,
    toggleDeliverable,
    toggleAdv,
    applyPreset,
    handleFilesUploaded,
    handleReset,
    setState,
  };
}
