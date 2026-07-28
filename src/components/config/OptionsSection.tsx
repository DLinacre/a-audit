'use client';

import React from 'react';
import {
  CATEGORIES,
  ROLES,
  DELIVERABLES,
  ADVANCED,
} from '../../domain/constants';
import { typeApplies } from '../../domain/helpers';

interface OptionsSectionProps {
  typeId: string;
  cats: Record<string, boolean>;
  roles: Record<string, boolean>;
  dels: Record<string, boolean>;
  adv: Record<string, boolean>;
  onToggleCategory: (id: string) => void;
  onToggleRole: (id: string) => void;
  onToggleDeliverable: (id: string) => void;
  onToggleAdv: (id: string) => void;
}

export const OptionsSection: React.FC<OptionsSectionProps> = ({
  typeId,
  cats,
  roles,
  dels,
  adv,
  onToggleCategory,
  onToggleRole,
  onToggleDeliverable,
  onToggleAdv,
}) => {
  const visibleCategories = CATEGORIES.filter((c) =>
    typeApplies((c as any).types || c.appliesTo, typeId)
  );

  const visibleRoles = ROLES.filter((r) =>
    typeApplies((r as any).types || r.appliesTo, typeId)
  );

  return (
    <section className="space-y-4 font-mono">
      {/* Categories Grid */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-gray-300">
            Audit Categories ({visibleCategories.length})
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {visibleCategories.map((c) => {
            const checked = cats[c.id] !== false;
            return (
              <label
                key={c.id}
                onClick={() => onToggleCategory(c.id)}
                className={`p-2 rounded border cursor-pointer transition-all flex items-start space-x-2 text-xs ${
                  checked
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff]/50 text-white font-bold'
                    : 'bg-[#0b0f14] border-[#1f2937] text-gray-500 hover:text-gray-300'
                }`}
                title={c.desc}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#00f0ff]"
                />
                <div className="flex flex-col">
                  <span>{c.name}</span>
                  {c.badge && (
                    <span className="text-[10px] text-[#00f0ff] uppercase">
                      {c.badge}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Expert Roles Grid */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 shadow-md">
        <label className="block text-xs font-bold text-gray-300 mb-3">
          Expert Roles ({visibleRoles.length})
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {visibleRoles.map((r) => {
            const checked = roles[r.id] !== false;
            return (
              <label
                key={r.id}
                onClick={() => onToggleRole(r.id)}
                className={`p-2 rounded border cursor-pointer transition-all flex items-start space-x-2 text-xs ${
                  checked
                    ? 'bg-[#00ff88]/10 border-[#00ff88]/50 text-white font-bold'
                    : 'bg-[#0b0f14] border-[#1f2937] text-gray-500 hover:text-gray-300'
                }`}
                title={r.desc}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#00ff88]"
                />
                <span>{r.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Required Deliverables */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 shadow-md">
        <label className="block text-xs font-bold text-gray-300 mb-3">
          Required Deliverables ({DELIVERABLES.length})
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {DELIVERABLES.map((d) => {
            const checked = dels[d.id] !== false;
            return (
              <label
                key={d.id}
                onClick={() => onToggleDeliverable(d.id)}
                className={`p-2 rounded border cursor-pointer transition-all flex items-start space-x-2 text-xs ${
                  checked
                    ? 'bg-[#ffcc00]/10 border-[#ffcc00]/50 text-white font-bold'
                    : 'bg-[#0b0f14] border-[#1f2937] text-gray-500 hover:text-gray-300'
                }`}
                title={d.desc}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {}}
                  className="mt-0.5 accent-[#ffcc00]"
                />
                <span>{d.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Advanced Rules */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 shadow-md">
        <label className="block text-xs font-bold text-gray-300 mb-3">
          Advanced Generation Rules ({ADVANCED.length})
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADVANCED.map((a) => {
            const checked = adv[a.id] !== false;
            return (
              <label
                key={a.id}
                onClick={() => onToggleAdv(a.id)}
                className={`p-2 rounded border cursor-pointer transition-all flex items-start space-x-2 text-xs ${
                  checked
                    ? 'bg-purple-500/10 border-purple-500/50 text-white font-bold'
                    : 'bg-[#0b0f14] border-[#1f2937] text-gray-500 hover:text-gray-300'
                }`}
                title={a.desc}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {}}
                  className="mt-0.5 accent-purple-500"
                />
                <span>{a.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
};
