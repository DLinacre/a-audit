'use client';

import React from 'react';

interface MobileTabSwitcherProps {
  activeTab: 'config' | 'preview';
  onSelectTab: (tab: 'config' | 'preview') => void;
}

export const MobileTabSwitcher: React.FC<MobileTabSwitcherProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-[#1f2937] p-2 flex items-center justify-around z-50 shadow-2xl font-mono"
      role="tablist"
      aria-label="Builder view"
    >
      <button
        type="button"
        onClick={() => onSelectTab('config')}
        className={`flex-1 py-2 rounded text-xs font-bold transition-all ${
          activeTab === 'config'
            ? 'bg-[#00f0ff] text-[#0b0f14] shadow'
            : 'text-gray-400 hover:text-white'
        }`}
        role="tab"
        aria-selected={activeTab === 'config'}
      >
        ⚙️ Configure
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('preview')}
        className={`flex-1 py-2 rounded text-xs font-bold transition-all ml-2 ${
          activeTab === 'preview'
            ? 'bg-[#00f0ff] text-[#0b0f14] shadow'
            : 'text-gray-400 hover:text-white'
        }`}
        role="tab"
        aria-selected={activeTab === 'preview'}
      >
        📋 View Prompt
      </button>
    </div>
  );
};
