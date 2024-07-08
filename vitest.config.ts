import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  test: {
    globals: true,
    setupFiles: ['./test/setup-unit.ts'],
    environment: 'happy-dom',
  },
  plugins: [tsConfigPaths()],
})
