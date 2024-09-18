import { makeProduct } from '../../../../test/factories/make-product'
import { test, expect } from '../../../../test/mocks/playwright-msw'
import { delay, HttpResponse } from 'msw'

test.describe('Home test (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    page
      .locator('div')
      .filter({ hasText: 'Atenção: A Api na qual este e' })
      .nth(3)

    await page.getByRole('button', { name: 'OK' }).click()
  })

  test('should be able visualize the header component', async ({ page }) => {
    await page.goto('/')

    const header = await page.waitForSelector('header')

    expect(header).toBeTruthy()
  })

  test('should be able navigate to catalog page if click in (Ver Catálogo) from Home', async ({
    page,
  }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Ver Catálogo' }).click()

    await page.waitForLoadState('load')

    await page.waitForURL('/catalog')

    const catalogPage = page.url()

    expect(catalogPage).toBe('http://localhost:3000/catalog')
  })

  test('should be able navigate to whatsapp if click in (Entre em contato) from Home', async ({
    page,
    context,
  }) => {
    await page.goto('/')

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Entre em contato' }).click(),
    ])

    const currentUrl = newPage.url()
    expect(currentUrl).toContain('api.whatsapp.com')
  })

  test('should be able to navigate for search page when searching for some product from Home', async ({
    page,
  }) => {
    await page.goto('/')

    await page.locator('form').waitFor()

    await page.getByPlaceholder('Buscar produtos...').waitFor()

    await page.waitForTimeout(5000)

    await page.getByPlaceholder('Buscar produtos...').fill('Realme Note 50')

    await page.getByRole('button', { name: 'buscar' }).click()

    await page.waitForTimeout(5000)

    const currentUrl = page.url()
    expect(currentUrl).toContain('http://localhost:3000/search')
  })

  test('should be able add some product in cart from section (Todos os produtos)', async ({
    page,
    worker,
    http,
  }) => {
    const firstProduct = makeProduct({
      id: '4681',
      title: 'Adicionar ao carrinho o product test (e2e)',
    })

    await worker.use(
      http.get('/products', async () => {
        await delay(250)
        return new HttpResponse(
          JSON.stringify({
            products: [firstProduct],
          }),
          {
            status: 200,
          },
        )
      }),
    )

    await page.goto('/')

    await expect(
      page.getByText('Todos os produtos', { exact: true }),
    ).toBeVisible()

    const product = page
      .getByText('Adicionar ao carrinho o product test (e2e)')
      .locator('..')
      .locator('..')

    await product.hover({ force: true })

    await page.getByRole('link', { name: 'Adicionar ao carrinho o' }).click()

    const toast = page.locator('[id="\\31 "]').getByRole('alert')

    expect(toast).toBeTruthy()
  })

  test('should be able visualize the footer component', async ({ page }) => {
    await page.goto('/')

    const footer = await page.waitForSelector('footer')

    expect(footer).toBeTruthy()
  })
})
