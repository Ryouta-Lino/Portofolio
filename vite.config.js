import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  publicDir: '../public',
  server: {
    open: true,
    port: 5500,
    strictPort: true,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}) 