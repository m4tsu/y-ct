/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    env: {
      VITE_RESAS_API_BASE_URL: 'https://test-api.example.com',
      VITE_RESAS_API_KEY: 'test-key',
    },
  },
});
