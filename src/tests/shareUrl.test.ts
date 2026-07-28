/**
 * ARENA BUILDER — SHARE URL REGRESSION SUITE
 * Verifies URLSearchParams encoding and decoding for configuration sharing.
 * Date: July 28, 2026
 */

import { describe, it, expect } from 'vitest';
import { cleanRaw } from '../domain/helpers';
import { BuilderState } from '../types';

function encodeShareParams(state: Partial<BuilderState>): string {
  const p = new URLSearchParams();
  const tv = cleanRaw(state.targetInput);
  if (tv) p.set('t', tv);
  if (state.manualType && state.manualType !== 'auto') {
    p.set('y', state.manualType);
  }
  if (state.depth && state.depth !== 'full') p.set('d', state.depth);
  if (state.style && state.style !== 'detailed') p.set('s', state.style);
  if (state.preset && state.preset !== 'full') p.set('p', state.preset);
  return p.toString();
}

function decodeShareParams(query: string): Record<string, string> {
  const p = new URLSearchParams(query);
  const res: Record<string, string> = {};
  p.forEach((val, key) => {
    res[key] = val;
  });
  return res;
}

describe('Shareable Link Encoding & Decoding Verification', () => {
  it('encodes non-default state properties into URL query string', () => {
    const qs = encodeShareParams({
      targetInput: 'https://example.com/app',
      manualType: 'saas',
      depth: 'forensic',
      style: 'agent',
      preset: 'perf',
    });

    const p = new URLSearchParams(qs);
    expect(p.get('t')).toBe('https://example.com/app');
    expect(p.get('y')).toBe('saas');
    expect(p.get('d')).toBe('forensic');
    expect(p.get('s')).toBe('agent');
    expect(p.get('p')).toBe('perf');
  });

  it('omits default parameters from encoded string for clean URLs', () => {
    const qs = encodeShareParams({
      targetInput: 'example.com',
      manualType: 'auto',
      depth: 'full',
      style: 'detailed',
      preset: 'full',
    });

    const p = new URLSearchParams(qs);
    expect(p.get('t')).toBe('example.com');
    expect(p.get('y')).toBeNull();
    expect(p.get('d')).toBeNull();
    expect(p.get('s')).toBeNull();
    expect(p.get('p')).toBeNull();
  });

  it('decodes query string back into configuration keys', () => {
    const decoded = decodeShareParams('t=https%3A%2F%2Fmy-api.dev&y=api&d=focused&s=concise');
    expect(decoded['t']).toBe('https://my-api.dev');
    expect(decoded['y']).toBe('api');
    expect(decoded['d']).toBe('focused');
    expect(decoded['s']).toBe('concise');
  });
});
