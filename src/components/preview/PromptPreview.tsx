'use client';

import React, { useState } from 'react';
import { PromptResult, BuilderState } from '../../types';
import { TYPES } from '../../domain/constants';
import { Copy, Download, Check, FileArchive, Sparkles, ExternalLink } from 'lucide-react';

interface PromptPreviewProps {
  promptResult: PromptResult;
  state: BuilderState;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({
  promptResult,
  state,
}) => {
  const [copied, setCopied] = useState(false);

  const charCount = promptResult.text.length;
  const sectionCount = (promptResult.text.match(/^## /gm) || []).length;
  const tConfig = TYPES[promptResult.typeId] || TYPES.generic;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptResult.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
    }
  };

  const handleSendToArenaAgent = async () => {
    try {
      await navigator.clipboard.writeText(promptResult.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard denied
    }
    const targetUrl = `https://arena.ai/agent?prompt=${encodeURIComponent(
      promptResult.text
    )}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadMd = () => {
    const blob = new Blob([promptResult.text], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arena-builder-${promptResult.target.slug}-${promptResult.typeId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadManifest = () => {
    const attachments = state.attachments || [];
    const manifest = {
      generatedAt: new Date().toISOString(),
      target: promptResult.target.display,
      type: promptResult.typeId,
      files: attachments.map((f) => ({
        name: f.name,
        path: f.path,
        size: f.size,
        type: f.type,
      })),
      promptSnippet: promptResult.text.slice(0, 500),
    };
    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evidence-manifest-${promptResult.target.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#111827] border border-[#1f2937] rounded-xl p-4 flex flex-col h-full font-mono shadow-xl">
      {/* Top Bar with Stats Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1f2937] pb-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-[#0b0f14] border border-[#1f2937] text-xs flex items-center space-x-1">
            <span className="text-gray-400">Type:</span>
            <span className="text-[#00f0ff] font-bold">
              {tConfig.icon} {tConfig.short}
            </span>
          </div>

          <div className="px-2.5 py-1 rounded bg-[#0b0f14] border border-[#1f2937] text-xs flex items-center space-x-1">
            <span className="text-gray-400">Chars:</span>
            <span className="text-white font-bold">
              {charCount.toLocaleString()}
            </span>
          </div>

          <div className="px-2.5 py-1 rounded bg-[#0b0f14] border border-[#1f2937] text-xs flex items-center space-x-1">
            <span className="text-gray-400">Sections:</span>
            <span className="text-white font-bold">{sectionCount}</span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSendToArenaAgent}
            className="px-4 py-1.5 rounded text-xs font-bold transition-all flex items-center space-x-1.5 bg-gradient-to-r from-[#a78bfa] via-[#5b8cff] to-[#22d3ee] hover:brightness-110 text-[#0b0f14] shadow-[0_0_14px_rgba(91,140,255,0.45)]"
            title="Open in Arena.ai Agent Mode with prompt automatically loaded & copied"
          >
            <Sparkles className="w-4 h-4 text-[#0b0f14]" />
            <span>SEND TO ARENA.AI AGENT</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0b0f14] opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all flex items-center space-x-1.5 ${
              copied
                ? 'bg-[#00ff88] text-[#0b0f14] shadow-[0_0_12px_rgba(0,255,136,0.5)]'
                : 'bg-[#00f0ff] hover:bg-[#00e5ff] text-[#0b0f14] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY PROMPT</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadMd}
            className="px-3 py-1.5 bg-[#1f2937] hover:bg-[#374151] text-white rounded text-xs font-bold transition-all flex items-center space-x-1.5"
            title="Download Prompt as .md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.MD</span>
          </button>

          {(state.attachments || []).length > 0 && (
            <button
              type="button"
              onClick={handleDownloadManifest}
              className="px-3 py-1.5 bg-[#1f2937] hover:bg-[#374151] text-gray-300 hover:text-white rounded text-xs font-bold transition-all flex items-center space-x-1"
              title="Download Local Evidence Manifest JSON"
            >
              <FileArchive className="w-3.5 h-3.5 text-[#ffcc00]" />
              <span>Manifest</span>
            </button>
          )}
        </div>
      </div>

      {/* Fail-Safe Clarification Warning Pill if any */}
      {promptResult.failSafeNotes.length > 0 && (
        <div className="bg-[#ff2a5f]/10 border border-[#ff2a5f]/40 text-[#ff2a5f] p-2.5 rounded-lg text-xs mb-3 space-y-1">
          <div className="font-bold">⚠️ AUTO FAIL-SAFE RESOLUTIONS APPLIED:</div>
          <ul className="list-disc list-inside text-[11px] space-y-0.5">
            {promptResult.failSafeNotes.map((n, idx) => (
              <li key={idx}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Formatted Markdown Display */}
      <div className="flex-1 min-h-[500px] max-h-[82vh] overflow-y-auto bg-[#0b0f14] rounded-lg border border-[#1f2937] p-4 text-gray-300 text-xs font-mono whitespace-pre-wrap leading-relaxed selection:bg-[#00f0ff] selection:text-[#0b0f14]">
        {promptResult.text}
      </div>
    </div>
  );
};
