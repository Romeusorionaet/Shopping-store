import { HttpResponse } from 'msw'
import { test, expect } from '../../../../test/mocks/playwright-msw'
import { makeUser } from '../../../../test/factories/make-user'

test.describe('Sign in Test (E2E)', () => {
  test('should be able the user sign in', async ({ page, worker, http }) => {
    await page.goto('/signIn')

    const user = makeUser({
      username: 'Romeu soares',
      email: 'romeu@gmail.com',
    })

    await worker.use(
      http.get('/buyer/profile', async () => {
        return new HttpResponse(
          JSON.stringify({
            profile: user,
          }),
          {
            status: 200,
          },
        )
      }),
    )

    await page.getByPlaceholder('pedro@gmail.com').fill(user.email)
    await page.getByLabel('Senha', { exact: true }).fill('123456')
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()

    await page.waitForLoadState('networkidle')

    expect(page.waitForURL('http://localhost:3000')).toBeTruthy()

    const userName = page.locator(user.username)

    expect(userName).toBeTruthy()
  })
})
