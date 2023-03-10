import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import { fileURLToPath } from 'node:url';


// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      "@firebase-config": fileURLToPath(new URL('./src/firebase/config.ts', import.meta.url))
    },
  },
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

