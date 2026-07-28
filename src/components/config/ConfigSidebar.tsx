'use client';

import React from 'react';
import { BuilderState, TargetTypeId, FileIntelResult } from '../../types';
import { TargetSection } from './TargetSection';
import { DepthStylePresets } from './DepthStylePresets';
import { EvidenceUploadSection } from './EvidenceUploadSection';
import { OptionsSection } from './OptionsSection';
import { resolveType } from '../../domain/fileIntel';

interface ConfigSidebarProps {
  state: BuilderState;
  onSetField: <K extends keyof BuilderState>(key: K, value: BuilderState[K]) => void;
  onSetManualType: (type: TargetTypeId) => void;
  onSetTargetInput: (val: string) => void;
  onSetDepth: (depth: 'focused' | 'full' | 'forensic') => void;
  onSetStyle: (style: 'concise' | 'detailed' | 'agent') => void;
  onApplyPreset: (presetId: string, typeId: string) => void;
  onToggleCategory: (id: string) => void;
  onToggleRole: (id: string) => void;
  onToggleDeliverable: (id: string) => void;
  onToggleAdv: (id: string) => void;
  onFilesUploaded: (
    fileIntel: FileIntelResult | null,
    attachments?: Array<{ name: string; path: string; size: number; type: string }>
  ) => void;
}

export const ConfigSidebar: React.FC<ConfigSidebarProps> = ({
  state,
  onSetField,
  onSetManualType,
  onSetTargetInput,
  onSetDepth,
  onSetStyle,
  onApplyPreset,
  onToggleCategory,
  onToggleRole,
  onToggleDeliverable,
  onToggleAdv,
  onFilesUploaded,
}) => {
  const resolved = resolveType(state);
  const typeId = resolved.type;

  return (
    <div className="w-full space-y-4">
      {/* Primary Target Settings */}
      <TargetSection
        state={state}
        onSetField={onSetField}
        onSetManualType={onSetManualType}
        onSetTargetInput={onSetTargetInput}
      />

      {/* Audit Depth, Style & Presets */}
      <DepthStylePresets
        typeId={typeId}
        depth={state.depth}
        style={state.style}
        activePreset={state.preset}
        onSetDepth={onSetDepth}
        onSetStyle={onSetStyle}
        onApplyPreset={onApplyPreset}
      />

      {/* Local Evidence Upload */}
      <EvidenceUploadSection
        state={state}
        onFilesUploaded={onFilesUploaded}
      />

      {/* Categories, Roles, Deliverables, Advanced Options */}
      <OptionsSection
        typeId={typeId}
        cats={state.cats}
        roles={state.roles}
        dels={state.dels}
        adv={state.adv}
        onToggleCategory={onToggleCategory}
        onToggleRole={onToggleRole}
        onToggleDeliverable={onToggleDeliverable}
        onToggleAdv={onToggleAdv}
      />
    </div>
  );
};
