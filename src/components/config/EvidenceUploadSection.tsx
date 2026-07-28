'use client';

import React, { useRef } from 'react';
import { FileIntelResult, BuilderState } from '../../types';
import { fileTypeInference } from '../../domain/fileIntel';
import { TYPES } from '../../domain/constants';
import { Upload, FolderOpen, FileText, Trash2 } from 'lucide-react';

interface EvidenceUploadSectionProps {
  state: BuilderState;
  onFilesUploaded: (
    fileIntel: FileIntelResult | null,
    attachments?: Array<{ name: string; path: string; size: number; type: string }>
  ) => void;
}

export const EvidenceUploadSection: React.FC<EvidenceUploadSectionProps> = ({
  state,
  onFilesUploaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList || []).slice(0, 120);
    if (!incoming.length) return;

    const attachments = incoming.map((f) => ({
      name: f.name,
      path: (f as any).webkitRelativePath || f.name,
      size: f.size,
      type: f.type,
    }));

    const readable = incoming
      .filter(
        (f) =>
          f.size <= 350000 &&
          /(?:text|json|javascript|xml|yaml|html|css|plist|gradle|manifest)/i.test(
            f.type + ' ' + f.name
          )
      )
      .slice(0, 35);

    const texts = await Promise.all(
      readable.map(async (f) => {
        try {
          return (await f.text()).slice(0, 18000);
        } catch {
          return '';
        }
      })
    );

    const names = attachments.map((f) => f.path).join(' ');
    const fileIntel: FileIntelResult = {
      text: `${names}\n${texts.join('\n')}`,
      signals: [],
      count: attachments.length,
      totalSize: attachments.reduce((sum, f) => sum + f.size, 0),
      filenames: attachments.map((f) => f.path),
      manifest: attachments.slice(0, 35),
    };

    onFilesUploaded(fileIntel, attachments);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer && e.dataTransfer.files) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleClear = () => {
    onFilesUploaded(null, []);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  const attachments = state.attachments || [];
  const inferred = fileTypeInference(state);

  return (
    <section className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 font-mono shadow-md">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-300 flex items-center space-x-1.5">
          <Upload className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>Local Evidence Upload (100% Client-Side)</span>
        </label>
        {attachments.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-[#ff2a5f] hover:underline flex items-center space-x-1"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear ({attachments.length})</span>
          </button>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#1f2937] hover:border-[#00f0ff] rounded-lg p-4 text-center transition-all bg-[#0b0f14]/60"
      >
        <p className="text-xs text-gray-400 mb-3">
          Drop files or folders here. All files are inspected locally in your browser — zero network uploads.
        </p>

        <div className="flex items-center justify-center space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-[#1f2937] hover:bg-[#374151] text-white rounded text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Add Files</span>
          </button>

          <button
            type="button"
            onClick={() => folderInputRef.current?.click()}
            className="px-3 py-1.5 bg-[#1f2937] hover:bg-[#374151] text-white rounded text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Choose Folder</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />
        <input
          ref={folderInputRef}
          type="file"
          multiple
          /* @ts-expect-error directory attribute for webkit */
          webkitdirectory=""
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />
      </div>

      {attachments.length > 0 && (
        <div className="bg-[#0b0f14] p-3 rounded border border-[#1f2937] text-xs text-gray-300 space-y-1">
          <div className="flex justify-between font-bold text-white">
            <span>
              {attachments.length} local item{attachments.length === 1 ? '' : 's'}
            </span>
            <span>
              {(
                attachments.reduce((sum, f) => sum + f.size, 0) / 1024
              ).toFixed(1)}{' '}
              KB
            </span>
          </div>
          {inferred && (
            <div className="text-[#00ff88]">
              Likely {TYPES[inferred.type]?.short || inferred.type} ({inferred.confidence}) — {inferred.why}
            </div>
          )}
          <ul className="list-disc list-inside text-[11px] text-gray-400 max-h-24 overflow-y-auto">
            {attachments.slice(0, 8).map((f, idx) => (
              <li key={idx} className="truncate">
                {f.path}
              </li>
            ))}
            {attachments.length > 8 && (
              <li>+ {attachments.length - 8} more</li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};
