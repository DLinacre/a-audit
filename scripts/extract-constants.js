const fs = require('fs');

const html = fs.readFileSync('/home/user/a-audit/index.html', 'utf8');
const lines = html.split('\n');

// Extract lines from "  const TYPES =" to right before "  const state ="
const startIdx = lines.findIndex(l => l.includes('const TYPES ='));
const endIdx = lines.findIndex(l => l.includes('const state ='));

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find start or end index for constants!");
  process.exit(1);
}

const rawCode = lines.slice(startIdx, endIdx).join('\n');

// Now let's transform the const declarations to export const declarations with TypeScript type annotations where helpful
let tsCode = `/**
 * PIXEL HEIST & ARENA BUILDER — DOMAIN CONSTANTS
 * Extracted with 100% fidelity from legacy codebase.
 * Date: July 28, 2026
 */

import { TypeConfig, TargetTypeId, CategoryItem, RoleItem, DeliverableItem, AdvancedItem, PresetDef } from '../types';

` + rawCode
  .replace('const TYPES =', 'export const TYPES: Record<string, any> =')
  .replace('const CATEGORIES =', 'export const CATEGORIES: CategoryItem[] =')
  .replace('const ROLES =', 'export const ROLES: RoleItem[] =')
  .replace('const DELIVERABLES =', 'export const DELIVERABLES: DeliverableItem[] =')
  .replace('const ADVANCED =', 'export const ADVANCED: AdvancedItem[] =')
  .replace('const DEPTH_HINTS =', 'export const DEPTH_HINTS: Record<string, string> =')
  .replace('const STYLE_HINTS =', 'export const STYLE_HINTS: Record<string, string> =')
  .replace('const PRESET_DEFS =', 'export const PRESET_DEFS: PresetDef[] =');

fs.writeFileSync('/home/user/a-audit/src/domain/constants.ts', tsCode, 'utf8');
console.log("Successfully generated src/domain/constants.ts (" + tsCode.split('\n').length + " lines)");
