import { test, expect } from '../../../test/mocks/playwright-msw'

test('should be able open the menu if click in Menu icon', async ({ page }) => {
  await page.goto('/')

  const menuButton = page.getByTestId('btn_menu')

  await menuButton.waitFor({ state: 'visible', timeout: 60000 })

  await menuButton.click()

  const ariaExpanded = await menuButton.getAttribute('aria-expanded')
  expect(ariaExpanded).toBe('true')
})

test('should be able open and close the menu', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('btn_menu').dblclick()

  const menuButton = page.getByTestId('btn_menu')

  const ariaExpanded = await menuButton.getAttribute('aria-expanded')
  expect(ariaExpanded).toBe('false')
})

test('should be able navigate to catalog page if click in (Catálogo) from menu options', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByTestId('btn_menu').click()

  await page.getByRole('button', { name: 'Catálogo', exact: true }).click()

  await page.waitForURL('/catalog')
})

test('should be able navigate to home page if click in (Início) from menu options', async ({
  page,
}) => {
  await page.goto('/catalog')

  await page.getByTestId('btn_menu').click()

  await page.getByRole('button', { name: 'Início', exact: true }).click()

  await page.waitForURL('/')
})

test('should be able navigate to orders page if click in (Meus pedidos) from menu options', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByTestId('btn_menu').click()

  await page.getByRole('button', { name: 'Meus pedidos', exact: true }).click()

  await page.waitForURL('/orders')
})

test('should be able navigate to address page if click in (Endereço de entrega) from menu options', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByTestId('btn_menu').click()

  await page
    .getByRole('button', { name: 'Endereço de entrega', exact: true })
    .click()

  await page.waitForURL('/address')
})

test('should be able navigate to sign in page if click in (Login) from menu options', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByTestId('btn_menu').click()

  await page.getByRole('button', { name: 'Login', exact: true }).click()

  await page.waitForURL('/signIn')
})

test('should be able navigate to sign in page if click in (icon logIn) from header', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByTestId('btn_signIn_from_header').click()

  await page.waitForURL('/signIn')
})

test('should be able navigate to home page if click in (logo - shopping store) from header', async ({
  page,
}) => {
  await page.goto('/catalog')

  await page.getByRole('link', { name: 'Shopping Store' }).click()

  await page.waitForURL('/')
})
