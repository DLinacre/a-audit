/**
 * ARENA BUILDER — TYPE DETECTOR & DOMAIN REGRESSION SUITE
 * Verifies reverse-TLD package detection vs subdomain domain names,
 * store URL matching, keyword inference, and zero regression of target types.
 * Date: July 28, 2026
 */

import { describe, it, expect } from 'vitest';
import { detectTypeFromInputs, fileTypeInference } from '../domain/fileIntel';
import { BuilderState } from '../types';

function getDefaultState(overrides?: Partial<BuilderState>): BuilderState {
  return {
    appMode: 'audit',
    manualType: 'auto',
    targetInput: 'https://example.com',
    depth: 'full',
    style: 'detailed',
    preset: 'full',
    cats: { executive: true, ux: true, performance: true },
    roles: { ux: true, dev: true },
    dels: { report: true },
    adv: {},
    fileIntel: null,
    extraContext: '',
    version: '',
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
    createAppName: 'New App',
    createAppVision: 'Vision',
    createPlatform: 'webapp',
    createArchitecture: 'monolith',
    createTechStack: 'TS',
    createCoreFeatures: '1. Auth',
    createAudience: 'Devs',
    createScope: 'mvp',
    refactorScope: 'Repo',
    refactorTechDebt: 'Debt',
    refactorTargetStack: 'TS + React',
    refactorTargetUrl: '',
    refactorTechStack: '',
    refactorObjectives: '',
    refactorPlan: '',
    ...overrides,
  };
}

describe('Type Detector & Package Name vs Subdomain Domain Verification', () => {
  it('correctly identifies standard domain names as website', () => {
    const res = detectTypeFromInputs(getDefaultState({ targetInput: 'example.com' }));
    expect(res.type).toBe('website');
  });

  it('correctly identifies subdomain URLs without falsely triggering Android package detection', () => {
    // Regression test for app.example.com and api.example.com
    const saasRes = detectTypeFromInputs(getDefaultState({ targetInput: 'app.example.com' }));
    expect(saasRes.type).toBe('saas');
    expect(saasRes.why).toContain('App/dashboard hostname pattern');

    const apiRes = detectTypeFromInputs(getDefaultState({ targetInput: 'api.example.com' }));
    expect(apiRes.type).toBe('api');

    const shopRes = detectTypeFromInputs(getDefaultState({ targetInput: 'shop.example.com' }));
    expect(shopRes.type).toBe('ecommerce');
    expect(shopRes.why).toContain('Shop/store hostname pattern');
  });

  it('correctly identifies valid reverse-TLD Android package names', () => {
    const pkgRes1 = detectTypeFromInputs(getDefaultState({ targetInput: 'com.google.android.youtube' }));
    expect(pkgRes1.type).toBe('android');
    expect(pkgRes1.why).toContain('Looks like an Android package name');

    const pkgRes2 = detectTypeFromInputs(getDefaultState({ targetInput: 'org.mozilla.firefox' }));
    expect(pkgRes2.type).toBe('android');
    expect(pkgRes2.why).toContain('Looks like an Android package name');
  });

  it('detects ios from App Store URLs and TestFlight links', () => {
    const res = detectTypeFromInputs(getDefaultState({ targetInput: 'https://apps.apple.com/us/app/example/id123456789' }));
    expect(res.type).toBe('ios');
    expect(res.why).toContain('App Store / TestFlight URL detected');
  });

  it('detects android from Google Play Store URLs', () => {
    const res = detectTypeFromInputs(getDefaultState({ targetInput: 'https://play.google.com/store/apps/details?id=com.example.app' }));
    expect(res.type).toBe('android');
    expect(res.why).toContain('Google Play URL detected');
  });

  it('detects extension from Chrome Web Store URLs', () => {
    const res = detectTypeFromInputs(getDefaultState({ targetInput: 'https://chromewebstore.google.com/detail/example-id' }));
    expect(res.type).toBe('extension');
    expect(res.why).toContain('Browser extension store URL detected');
  });

  it('detects desktop from Windows/macOS/Linux executable patterns', () => {
    const res = detectTypeFromInputs(getDefaultState({ targetInput: 'MyAppSetup.exe' }));
    expect(res.type).toBe('desktop');
    expect(res.why).toContain('Desktop installer/executable signals detected');
  });

  it('infers type from fileIntel when package or manifest files are uploaded', () => {
    const intelRes = fileTypeInference(
      getDefaultState({
        fileIntel: {
          text: 'applicationId "com.example.app" compileSdk 34 androidmanifest.xml',
          signals: [],
          count: 1,
          totalSize: 1024,
          filenames: ['build.gradle'],
          treeSnippet: '',
        },
      })
    );
    expect(intelRes).not.toBeNull();
    expect(intelRes?.type).toBe('android');
    expect(intelRes?.why).toContain('Android manifest, Gradle, package, or APK/AAB signal');
  });
});
