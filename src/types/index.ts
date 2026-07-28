/**
 * PIXEL HEIST & ARENA BUILDER — STRICT TYPESCRIPT INTERFACES
 * Canonical Domain Contracts & State Types for a-audit
 * Date: July 28, 2026
 */

export type AppMode = 'audit' | 'create' | 'refactor';

export type TargetTypeId =
  | 'auto'
  | 'website'
  | 'ios'
  | 'android'
  | 'desktop'
  | 'saas'
  | 'extension'
  | 'api'
  | 'landing'
  | 'ecommerce'
  | 'game'
  | 'pwa'
  | 'generic'
  | 'create'
  | 'refactor'
  | string;

export interface FieldConfig {
  id: string;
  label: string;
  ph: string;
  autoFill?: (raw: string) => string;
}

export interface InputConfig {
  label: string;
  prefix: string;
  plain?: boolean;
  ph: string;
}

export interface TypeConfig {
  id: TargetTypeId;
  label: string;
  short: string;
  icon: string;
  title: string;
  noun: string;
  transform: string;
  standards?: string;
  fields?: FieldConfig[];
  input?: InputConfig;
  defaultCats?: string[] | null;
  defaultRoles?: string[] | null;
  scope?: string[];
  discover?: string;
  assets?: string[];
  folders?: string[];
  catBodiesExtra?: Record<string, string>;
}

export interface CategoryItem {
  id: string;
  name: string;
  desc?: string;
  badge?: string;
  types?: string | string[];
  appliesTo?: string | string[];
}

export interface RoleItem {
  id: string;
  name: string;
  desc?: string;
  types?: string | string[];
  appliesTo?: string | string[];
}

export interface DeliverableItem {
  id: string;
  name: string;
  desc?: string;
  default?: boolean;
}

export interface AdvancedItem {
  id: string;
  name: string;
  desc?: string;
  default?: boolean;
}

export interface PresetDef {
  id: string;
  label: string;
  short?: string;
  icon?: string;
  cats?: string[] | null;
  roles?: string[] | null;
  desc?: string;
  webOnly?: boolean;
  storeOnly?: boolean;
}

export interface FileIntelResult {
  text: string;
  signals: string[];
  count?: number;
  totalSize?: number;
  filenames?: string[];
  treeSnippet?: string;
  manifest?: Array<{
    name: string;
    path: string;
    size: number;
    type: string;
  }>;
}

export interface ResolvedType {
  source: 'manual' | 'detected' | 'default' | 'auto';
  type: TargetTypeId;
  confidence?: 'high' | 'medium' | 'low';
  tie?: boolean;
  topReasons?: string[];
  why?: string;
  reasons?: string[];
  score?: number;
}

export interface PromptResult {
  text: string;
  resolved: ResolvedType;
  target: {
    display: string;
    slug: string;
  };
  typeId: TargetTypeId;
  name: string;
  cats: CategoryItem[];
  roles: RoleItem[];
  failSafeNotes: string[];
}

export interface BuilderState {
  appMode: AppMode;
  manualType: TargetTypeId | null;
  targetInput: string;
  depth: 'focused' | 'full' | 'forensic';
  style: 'concise' | 'detailed' | 'agent';
  preset: string;
  cats: Record<string, boolean>;
  roles: Record<string, boolean>;
  dels: Record<string, boolean>;
  adv: Record<string, boolean>;
  fileIntel: FileIntelResult | null;
  attachments?: Array<{
    name: string;
    path: string;
    size: number;
    type: string;
  }>;
  extraContext: string;
  productName?: string;
  market?: string;

  // Audit Dynamic Fields
  version: string;
  storeUrl: string;
  appId: string;
  appName: string;
  androidUrl: string;
  packageId: string;
  os: string;
  installerUrl: string;
  pricing: string;
  signupUrl: string;
  browser: string;
  storeId: string;
  apiDocs: string;
  authMethod: string;
  ctaUrl: string;
  adPlatform: string;
  checkoutUrl: string;
  platform: string;
  engine: string;
  framework: string;
  manifestUrl: string;

  // Create App Fields
  createAppName: string;
  createAppVision: string;
  createPlatform: string;
  createArchitecture: string;
  createTechStack: string;
  createCoreFeatures: string;
  createAudience: string;
  createScope: string;

  // Refactor Fields
  refactorScope: string;
  refactorTechDebt?: string;
  refactorTargetStack?: string;
  refactorTargetUrl: string;
  refactorTechStack: string;
  refactorObjectives: string;
  refactorPlan: string;
}
