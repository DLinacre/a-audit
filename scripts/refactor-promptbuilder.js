const fs = require('fs');

const html = fs.readFileSync('/home/user/a-audit/index.html', 'utf8');
const lines = html.split('\n');

const startIdx = lines.findIndex(l => l.includes('function buildPrompt()'));
const endIdx = lines.findIndex(l => l.includes('function settingsSnapshot()'));

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find start or end index for buildPrompt!");
  process.exit(1);
}

let code = lines.slice(startIdx, endIdx).join('\n');

let tsCode = `/**
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
` + code
  .replace(/function buildPrompt\(\)\s*\{/, '')
  .replace(/\$\("#createAppName"\)\?\.value/g, "state.createAppName")
  .replace(/\$\("#createAppVision"\)\?\.value/g, "state.createAppVision")
  .replace(/\$\("#createPlatform"\)\?\.value/g, "state.createPlatform")
  .replace(/\$\("#createArchitecture"\)\?\.value/g, "state.createArchitecture")
  .replace(/\$\("#createTechStack"\)\?\.value/g, "state.createTechStack")
  .replace(/\$\("#createCoreFeatures"\)\?\.value/g, "state.createCoreFeatures")
  .replace(/\$\("#createAudience"\)\?\.value/g, "state.createAudience")
  .replace(/\$\("#createScope"\)\?\.value/g, "state.createScope")
  .replace(/\$\("#refactorScopeInput"\)\?\.value/g, "state.refactorScope")
  .replace(/\$\("#refactorTechDebtInput"\)\?\.value/g, "(state.refactorTechDebt || 'Legacy code patterns, technical debt, unhandled errors, and performance bottlenecks.')")
  .replace(/\$\("#refactorTargetStackInput"\)\?\.value/g, "(state.refactorTargetStack || 'TypeScript + React 19 + Tailwind v4 + Clean Modular Architecture')")
  .replace(/\$\("#refactorScope"\)\?\.value/g, "state.refactorScope")
  .replace(/\$\("#refactorTargetUrl"\)\?\.value/g, "state.refactorTargetUrl")
  .replace(/\$\("#refactorTechStack"\)\?\.value/g, "state.refactorTechStack")
  .replace(/\$\("#refactorObjectives"\)\?\.value/g, "state.refactorObjectives")
  .replace(/\$\("#refactorPlan"\)\?\.value/g, "state.refactorPlan")
  .replace(/\$\("#extraContext"\)\.value/g, "state.extraContext")
  .replace(/\$\("#productName"\)\.value/g, "(state.productName || '')")
  .replace(/\$\("#market"\)\.value/g, "(state.market || '')")
  .replace(/resolveType\(\)/g, "resolveType(state)")
  .replace(/normalizeTarget\(typeId\)/g, "normalizeTarget(typeId, state)")
  .replace(/brandName\(target\)/g, "brandName(target)")
  .replace(/resolveMarket\(typeId\)/g, "resolveMarket(typeId, state)")
  .replace(/gatherDyn\(typeId\)/g, "gatherDyn(typeId, state)")
  .replace(/let cats = selectedList\(state\.cats, relevantCategories\(typeId\)\);/g, "let cats = selectedList(state.cats, relevantCategories(typeId));")
  .replace(/let roles = selectedList\(state\.roles, relevantRoles\(typeId\)\);/g, "let roles = selectedList(state.roles, relevantRoles(typeId));")
  .replace(/const dels = selectedList\(state\.dels, DELIVERABLES\);/g, "const dels = selectedList(state.dels, DELIVERABLES);")
  .replace(/const adv = state\.adv;/g, "const adv = state.adv;");

fs.writeFileSync('/home/user/a-audit/src/domain/promptBuilder.ts', tsCode, 'utf8');
console.log('Generated src/domain/promptBuilder.ts');
