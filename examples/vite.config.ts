import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), svgLoader(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
  },
})
