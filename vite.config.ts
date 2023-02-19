import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js'
  },

})

