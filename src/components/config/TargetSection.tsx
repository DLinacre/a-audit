'use client';

import React from 'react';
import { BuilderState, TargetTypeId } from '../../types';
import { TYPES } from '../../domain/constants';
import { resolveType } from '../../domain/fileIntel';

interface TargetSectionProps {
  state: BuilderState;
  onSetField: <K extends keyof BuilderState>(key: K, value: BuilderState[K]) => void;
  onSetManualType: (type: TargetTypeId) => void;
  onSetTargetInput: (val: string) => void;
}

export const TargetSection: React.FC<TargetSectionProps> = ({
  state,
  onSetField,
  onSetManualType,
  onSetTargetInput,
}) => {
  const resolved = resolveType(state);
  const typeId = resolved.type;
  const tConfig = TYPES[typeId] || TYPES.generic;

  if (state.appMode === 'create') {
    return (
      <section className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 font-mono shadow-md">
        <h3 className="text-sm font-bold text-[#00ff88] flex items-center space-x-1.5 uppercase tracking-wide">
          <span>🚀 NEW APP SPECIFICATION</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Product Name</label>
            <input
              type="text"
              value={state.createAppName}
              onChange={(e) => onSetField('createAppName', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00ff88]"
              placeholder="e.g. Pixel Heist"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Target Platform</label>
            <select
              value={state.createPlatform}
              onChange={(e) => onSetField('createPlatform', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00ff88]"
            >
              <option value="webapp">WEBAPP (Browser Single-Page App)</option>
              <option value="ios">IOS (Apple App Store)</option>
              <option value="android">ANDROID (Google Play / APK)</option>
              <option value="desktop">DESKTOP (Windows / Mac / Linux)</option>
              <option value="saas">SAAS (Multi-tenant Cloud App)</option>
              <option value="pwa">PWA (Progressive Web App)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Architecture Style</label>
            <select
              value={state.createArchitecture}
              onChange={(e) => onSetField('createArchitecture', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00ff88]"
            >
              <option value="monolith">Modular Monolith</option>
              <option value="serverless">Serverless / Edge Architecture</option>
              <option value="microservices">Microservices / Distributed</option>
              <option value="localfirst">Local-First (IndexedDB / Dexie)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">MVP Target Scope</label>
            <select
              value={state.createScope}
              onChange={(e) => onSetField('createScope', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00ff88]"
            >
              <option value="mvp">Single-Page Core MVP</option>
              <option value="full">Full-Stack Core Product MVP</option>
              <option value="enterprise">Enterprise System Specification</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Preferred Tech Stack</label>
          <input
            type="text"
            value={state.createTechStack}
            onChange={(e) => onSetField('createTechStack', e.target.value)}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00ff88]"
            placeholder="e.g. Next.js 15 + Phaser 3 + TypeScript"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Product Vision & Pitch</label>
          <textarea
            value={state.createAppVision}
            onChange={(e) => onSetField('createAppVision', e.target.value)}
            rows={3}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00ff88]"
            placeholder="What does the product do and why is it special?"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Core Feature Backlog (One per line)</label>
          <textarea
            value={state.createCoreFeatures}
            onChange={(e) => onSetField('createCoreFeatures', e.target.value)}
            rows={4}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00ff88]"
            placeholder="1. Feature one&#10;2. Feature two"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Target Audience & Personas</label>
          <input
            type="text"
            value={state.createAudience}
            onChange={(e) => onSetField('createAudience', e.target.value)}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00ff88]"
            placeholder="e.g. Puzzle gamers, strategy fans"
          />
        </div>
      </section>
    );
  }

  if (state.appMode === 'refactor') {
    return (
      <section className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 font-mono shadow-md">
        <h3 className="text-sm font-bold text-[#ffcc00] flex items-center space-x-1.5 uppercase tracking-wide">
          <span>⚡ REFACTOR & CODE MODERNIZATION SPECIFICATION</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Target Scope / Module</label>
            <input
              type="text"
              value={state.refactorScope}
              onChange={(e) => onSetField('refactorScope', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#ffcc00]"
              placeholder="e.g. Entire Application / Core Modules"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Target Repository / URL</label>
            <input
              type="text"
              value={state.refactorTargetUrl}
              onChange={(e) => onSetField('refactorTargetUrl', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#ffcc00]"
              placeholder="https://github.com/DLinacre/a-audit"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Current Tech Stack</label>
            <input
              type="text"
              value={state.refactorTechStack}
              onChange={(e) => onSetField('refactorTechStack', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ffcc00]"
              placeholder="e.g. Legacy HTML5/JS monolithic file"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Target Tech Stack & Architecture</label>
            <input
              type="text"
              value={state.refactorTargetStack || 'TypeScript + React 19 + Tailwind v4 + Clean Modular Architecture'}
              onChange={(e) => onSetField('refactorTargetStack', e.target.value)}
              className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#ffcc00]"
              placeholder="e.g. TypeScript + React 19 + Tailwind v4"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Technical Debt & Current Pain Points</label>
          <textarea
            value={state.refactorTechDebt || 'Legacy code patterns, technical debt, unhandled errors, and performance bottlenecks.'}
            onChange={(e) => onSetField('refactorTechDebt', e.target.value)}
            rows={2}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ffcc00]"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Refactoring Objectives & Quality Standards</label>
          <textarea
            value={state.refactorObjectives}
            onChange={(e) => onSetField('refactorObjectives', e.target.value)}
            rows={3}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ffcc00]"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Step-by-Step Refactoring Plan</label>
          <textarea
            value={state.refactorPlan}
            onChange={(e) => onSetField('refactorPlan', e.target.value)}
            rows={4}
            className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#ffcc00]"
          />
        </div>
      </section>
    );
  }

  // Audit Mode Default Target UI
  return (
    <section className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 font-mono shadow-md">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-gray-300">Target Type:</label>
          <select
            value={state.manualType || 'auto'}
            onChange={(e) => onSetManualType(e.target.value as TargetTypeId)}
            className="bg-[#0b0f14] border border-[#1f2937] rounded px-2 py-1 text-white text-xs font-bold focus:outline-none focus:border-[#00f0ff]"
          >
            {Object.values(TYPES).map((tp) => (
              <option key={tp.id} value={tp.id}>
                {tp.icon} {tp.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-bold">
            resolved: {tConfig.short.toLowerCase()}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1f2937] text-gray-300">
            source: {resolved.source}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">
          {tConfig.input?.label || 'Primary target URL / identifier'}
        </label>
        <div className="flex items-center">
          {tConfig.input?.prefix && (
            <span className="bg-[#1f2937] border border-r-0 border-[#1f2937] rounded-l px-3 py-2 text-xs text-gray-400">
              {tConfig.input.prefix}
            </span>
          )}
          <input
            type="text"
            value={state.targetInput}
            onChange={(e) => onSetTargetInput(e.target.value)}
            className={`flex-1 bg-[#0b0f14] border border-[#1f2937] px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-[#00f0ff] ${
              tConfig.input?.prefix ? 'rounded-r' : 'rounded'
            }`}
            placeholder={tConfig.input?.ph || 'example.com / app name'}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Extra Context / Notes</label>
        <textarea
          value={state.extraContext}
          onChange={(e) => onSetField('extraContext', e.target.value)}
          rows={2}
          className="w-full bg-[#0b0f14] border border-[#1f2937] rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00f0ff]"
          placeholder="Optional notes, focus areas, or known issues..."
        />
      </div>
    </section>
  );
};
