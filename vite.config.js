import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  build: { outDir: process.env.BUILD_OUTPUT_DIR || 'dist' },
})
