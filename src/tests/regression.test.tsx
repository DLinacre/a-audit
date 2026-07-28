/**
 * PIXEL HEIST & ARENA BUILDER — UI INTEGRATION & REGRESSION SUITE
 * Verifies React 19 component hierarchy, mode transitions, and DOM rendering.
 * Date: July 28, 2026
 */

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import App from '../App';

describe('Arena Builder React 19 UI Regression Suite', () => {
  it('renders the top header banner and mode segment switcher', () => {
    render(<App />);

    expect(screen.getByText(/ARENA BUILDER/i)).toBeInTheDocument();
    expect(screen.getByText(/v2.0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🔍 Audit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🚀 Create App/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /⚡ Refactor/i })).toBeInTheDocument();
  });

  it('switches between Audit, Create App, and Refactor modes without errors', () => {
    render(<App />);

    // Default audit mode
    expect(screen.getByText(/Website URL/i)).toBeInTheDocument();

    // Click Create App mode
    const createBtn = screen.getByRole('button', { name: /🚀 Create App/i });
    fireEvent.click(createBtn);
    expect(screen.getByText(/NEW APP SPECIFICATION/i)).toBeInTheDocument();

    // Click Refactor mode
    const refactorBtn = screen.getByRole('button', { name: /⚡ Refactor/i });
    fireEvent.click(refactorBtn);
    expect(screen.getByText(/REFACTOR & CODE MODERNIZATION SPECIFICATION/i)).toBeInTheDocument();
  });

  it('displays the live markdown prompt preview with action buttons', () => {
    render(<App />);

    expect(screen.getByText(/SEND TO ARENA\.AI AGENT/i)).toBeInTheDocument();
    expect(screen.getByText(/COPY PROMPT/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Download Prompt as .md/i)).toBeInTheDocument();
    expect(screen.getByText(/MASTER WEBSITE AUDIT & GROWTH CONSULTANT/i)).toBeInTheDocument();
  });
});
