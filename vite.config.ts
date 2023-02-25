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
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url))
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

