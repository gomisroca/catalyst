import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: './tests/setup.js',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
