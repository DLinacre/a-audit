'use client';

import React from 'react';
import { DEPTH_HINTS, STYLE_HINTS, PRESET_DEFS } from '../../domain/constants';

interface DepthStylePresetsProps {
  typeId: string;
  depth: 'focused' | 'full' | 'forensic';
  style: 'concise' | 'detailed' | 'agent';
  activePreset: string;
  onSetDepth: (depth: 'focused' | 'full' | 'forensic') => void;
  onSetStyle: (style: 'concise' | 'detailed' | 'agent') => void;
  onApplyPreset: (presetId: string, typeId: string) => void;
}

export const DepthStylePresets: React.FC<DepthStylePresetsProps> = ({
  typeId,
  depth,
  style,
  activePreset,
  onSetDepth,
  onSetStyle,
  onApplyPreset,
}) => {
  const isWebish = ['website', 'saas', 'landing', 'ecommerce', 'pwa', 'api'].includes(typeId);
  const isStoreish = ['ios', 'android', 'extension', 'game'].includes(typeId);

  const visiblePresets = PRESET_DEFS.filter((p) => {
    if (p.webOnly && !isWebish) return false;
    if (p.storeOnly && !isStoreish) return false;
    return true;
  });

  return (
    <section className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 font-mono shadow-md">
      {/* Depth & Style Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Audit Depth */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-bold">
            Audit Depth
          </label>
          <div className="flex bg-[#0b0f14] p-1 rounded border border-[#1f2937]">
            {(['focused', 'full', 'forensic'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onSetDepth(d)}
                className={`flex-1 py-1 rounded text-xs font-bold transition-all capitalize ${
                  depth === d
                    ? 'bg-[#00f0ff] text-[#0b0f14]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title={DEPTH_HINTS[d]}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{DEPTH_HINTS[depth]}</p>
        </div>

        {/* Output Style */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-bold">
            Output Style
          </label>
          <div className="flex bg-[#0b0f14] p-1 rounded border border-[#1f2937]">
            {(['concise', 'detailed', 'agent'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSetStyle(s)}
                className={`flex-1 py-1 rounded text-xs font-bold transition-all capitalize ${
                  style === s
                    ? 'bg-[#00f0ff] text-[#0b0f14]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title={STYLE_HINTS[s]}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{STYLE_HINTS[style]}</p>
        </div>
      </div>

      {/* Preset Definitions */}
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-bold">
          Quick Presets (Toggles Categories & Roles)
        </label>
        <div className="flex flex-wrap gap-2">
          {visiblePresets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onApplyPreset(p.id, typeId)}
              className={`px-3 py-1.5 rounded border text-xs font-bold transition-all flex items-center space-x-1 ${
                activePreset === p.id
                  ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                  : 'bg-[#0b0f14] border-[#1f2937] text-gray-400 hover:text-white'
              }`}
              title={p.desc}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
