'use client';

import React, { useState, useCallback } from 'react';
import { useBuilderState } from './hooks/useBuilderState';
import { useShareUrl } from './hooks/useShareUrl';
import { buildPrompt } from './domain/promptBuilder';
import { Header } from './components/layout/Header';
import { MobileTabSwitcher } from './components/layout/MobileTabSwitcher';
import { ConfigSidebar } from './components/config/ConfigSidebar';
import { PromptPreview } from './components/preview/PromptPreview';
import { TargetTypeId } from './types';

export function App() {
  const {
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
  } = useBuilderState();

  const [activeTab, setActiveTab] = useState<'config' | 'preview'>('config');

  // Load shared state from URL query params on initial render
  const handleLoadSharedState = useCallback(
    (shared: {
      targetInput?: string;
      manualType?: TargetTypeId;
      depth?: 'focused' | 'full' | 'forensic';
      style?: 'concise' | 'detailed' | 'agent';
      preset?: string;
    }) => {
      setState((prev) => ({
        ...prev,
        ...(shared.targetInput !== undefined && {
          targetInput: shared.targetInput,
        }),
        ...(shared.manualType !== undefined && {
          manualType: shared.manualType,
        }),
        ...(shared.depth !== undefined && { depth: shared.depth }),
        ...(shared.style !== undefined && { style: shared.style }),
        ...(shared.preset !== undefined && { preset: shared.preset }),
      }));
    },
    [setState]
  );

  useShareUrl(state, handleLoadSharedState);

  // Generate deterministic prompt from current state
  const promptResult = buildPrompt(state);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-gray-200 flex flex-col font-mono pb-16 md:pb-6">
      {/* Top Banner Header */}
      <Header
        appMode={state.appMode}
        onSelectMode={setAppMode}
        onReset={handleReset}
      />

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Configuration Sidebar */}
        <div
          className={`md:col-span-6 lg:col-span-5 ${
            activeTab === 'config' ? 'block' : 'hidden md:block'
          }`}
        >
          <ConfigSidebar
            state={state}
            onSetField={setField}
            onSetManualType={setManualType}
            onSetTargetInput={setTargetInput}
            onSetDepth={setDepth}
            onSetStyle={setStyle}
            onApplyPreset={applyPreset}
            onToggleCategory={toggleCategory}
            onToggleRole={toggleRole}
            onToggleDeliverable={toggleDeliverable}
            onToggleAdv={toggleAdv}
            onFilesUploaded={handleFilesUploaded}
          />
        </div>

        {/* Right Live Prompt Preview */}
        <div
          className={`md:col-span-6 lg:col-span-7 sticky top-20 ${
            activeTab === 'preview' ? 'block' : 'hidden md:block'
          }`}
        >
          <PromptPreview promptResult={promptResult} state={state} />
        </div>
      </main>

      {/* Mobile Tab Switcher */}
      <MobileTabSwitcher
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}

export default App;
