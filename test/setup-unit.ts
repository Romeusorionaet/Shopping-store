import '@testing-library/jest-dom/vitest'
import React from 'react'
global.React = React

beforeEach(() => {
  vi.mock('next/navigation', () => {
    return {
      useRouter: vi.fn(() => ({
        push: vi.fn(),
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn((key) => {
          if (key === 'p') return '1'
          return null
        }),
      })),
      usePathname: vi.fn(),
    }
  })
})
