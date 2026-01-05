import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  base: './',
  server: {
    fs: {
      // Allow importing assets from the repo root (e.g. /pirata.gif) while Vite root is /frontend.
      allow: [__dirname]
    }
  },
  build: {
    outDir: '../dist/renderer',
    emptyOutDir: true,
    sourcemap: false, // Отключаем sourcemap для production
    minify: 'esbuild', // Минификация для уменьшения размера
    rollupOptions: {
      output: {
        manualChunks: undefined // Отключаем code splitting для Electron
      }
    }
  }
})


