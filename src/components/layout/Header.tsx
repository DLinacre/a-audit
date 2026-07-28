'use client';

import React from 'react';
import { AppMode } from '../../types';
import { Search, Rocket, Zap, RotateCcw } from 'lucide-react';

interface HeaderProps {
  appMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  onSelectMode,
  onReset,
}) => {
  return (
    <header className="w-full bg-[#0b0f14]/95 border-b border-[#1f2937] px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md sticky top-0 z-40">
      {/* Brand & Banner Logo */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-mono font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
            🚀 ARENA BUILDER
          </span>
          <span className="text-xs font-mono bg-[#1f2937] px-2 py-0.5 rounded text-gray-300">
            v2.0 (React 19 + TypeScript)
          </span>
        </div>
      </div>

      {/* Mode Segment Switcher */}
      <div
        className="flex items-center bg-[#111827] p-1 rounded-lg border border-[#1f2937]"
        role="group"
        aria-label="Builder mode"
      >
        <button
          type="button"
          onClick={() => onSelectMode('audit')}
          className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
            appMode === 'audit'
              ? 'bg-[#00f0ff] text-[#0b0f14] shadow-[0_0_12px_rgba(0,240,255,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-pressed={appMode === 'audit'}
        >
          <Search className="w-3.5 h-3.5" />
          <span>🔍 Audit</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('create')}
          className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
            appMode === 'create'
              ? 'bg-[#00ff88] text-[#0b0f14] shadow-[0_0_12px_rgba(0,255,136,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-pressed={appMode === 'create'}
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>🚀 Create App</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('refactor')}
          className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
            appMode === 'refactor'
              ? 'bg-[#ffcc00] text-[#0b0f14] shadow-[0_0_12px_rgba(255,204,0,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-pressed={appMode === 'refactor'}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>⚡ Refactor</span>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onReset}
          className="p-1.5 bg-[#111827] hover:bg-[#1f2937] text-gray-400 hover:text-white border border-[#1f2937] rounded transition-all flex items-center space-x-1 text-xs font-mono px-3"
          title="Reset All Selections to Default"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
