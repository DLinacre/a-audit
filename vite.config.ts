import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  base: './', // Enforce relative asset paths for GitHub Pages static hosting
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
