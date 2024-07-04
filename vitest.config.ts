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
    include: ['**/*.e2e-spec.tsx', '**/*spec.tsx', '**/*spec.ts'],
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
  plugins: [tsConfigPaths()],
})
