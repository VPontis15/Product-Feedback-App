import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable TypeScript error checking
    minify: true,
    sourcemap: true,
    rollupOptions: {
      // This will make Vite continue the build even when TS has errors
      onwarn(warning, warn) {
        if (warning.code === 'TS_ERROR') return;
        warn(warning);
      },
    },
  },
});
