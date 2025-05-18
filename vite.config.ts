import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // visualizer({
    //   open: true,
    //   filename: 'visualizer.html',
    // }),
    AutoImport({
      // dirs: ['./src/hooks'],
      imports: ['vue', '@vueuse/core'],
    }),
    Components({
      dirs: ['./src/components'],
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'lib',
      exclude: ['src/demo/**/*', 'examples/**/*']
    }),
  ],
  optimizeDeps: {
    include: ['vue'],
    exclude: ['examples/*', 'src/demo/*']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'echo-editor',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          vue: 'vue',
        },
      },
      external: ['vue'],
    },
  },
})
