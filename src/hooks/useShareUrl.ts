/**
 * PIXEL HEIST & ARENA BUILDER — SHARE URL SYNC HOOK
 * Syncs URLSearchParams (?t=...&y=...&d=...&s=...&p=...) with React state.
 * Date: July 28, 2026
 */

import { useEffect } from 'react';
import { BuilderState, TargetTypeId } from '../types';
import { cleanRaw } from '../domain/helpers';

const SHARE_KEYS = {
  target: 't',
  type: 'y',
  depth: 'd',
  style: 's',
  preset: 'p',
};

export function useShareUrl(
  state: BuilderState,
  onLoadSharedState: (shared: {
    targetInput?: string;
    manualType?: TargetTypeId;
    depth?: 'focused' | 'full' | 'forensic';
    style?: 'concise' | 'detailed' | 'agent';
    preset?: string;
  }) => void
): void {
  // Read initial URL share parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const targetInput = p.get(SHARE_KEYS.target) || undefined;
    const manualType = (p.get(SHARE_KEYS.type) as TargetTypeId) || undefined;
    const depth = (p.get(SHARE_KEYS.depth) as 'focused' | 'full' | 'forensic') || undefined;
    const style = (p.get(SHARE_KEYS.style) as 'concise' | 'detailed' | 'agent') || undefined;
    const preset = p.get(SHARE_KEYS.preset) || undefined;

    if (targetInput || manualType || depth || style || preset) {
      onLoadSharedState({ targetInput, manualType, depth, style, preset });
    }
  }, []);

  // Update browser URL query string without reloading page when key state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams();
    const tv = cleanRaw(state.targetInput);
    if (tv) p.set(SHARE_KEYS.target, tv);
    if (state.manualType && state.manualType !== 'auto') {
      p.set(SHARE_KEYS.type, state.manualType);
    }
    if (state.depth && state.depth !== 'full') p.set(SHARE_KEYS.depth, state.depth);
    if (state.style && state.style !== 'detailed') p.set(SHARE_KEYS.style, state.style);
    if (state.preset && state.preset !== 'full') p.set(SHARE_KEYS.preset, state.preset);

    const qs = p.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', url);
  }, [state.targetInput, state.manualType, state.depth, state.style, state.preset]);
}
