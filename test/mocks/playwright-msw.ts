import { test as base, expect } from '@playwright/test'
import { http } from 'msw'
import type { MockServiceWorker } from 'playwright-msw'
import { createWorkerFixture } from 'playwright-msw'
import { handlers } from './handlers'
import { setupServer } from 'msw/node'

const test = base.extend<{
  worker: MockServiceWorker
  http: typeof http
}>({
  worker: createWorkerFixture(handlers),
  http,
})

const server = setupServer(...handlers)

test.beforeAll(() => server.listen())
test.afterAll(() => server.resetHandlers())
test.afterAll(() => server.close())

export { test, expect }
