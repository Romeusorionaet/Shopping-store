import { test, expect } from '../../../test/mocks/playwright-msw'

test.describe('Carousel Products (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    const okButton = page.getByRole('button', { name: 'OK' })

    if (await okButton.isVisible()) {
      await okButton.click()
    }

    const buttonSignOut = page.getByRole('button', { name: 'Sign out' })

    if (await buttonSignOut.isVisible()) {
      await buttonSignOut.click()
    }
  })

  test('should not be able view the left arrow in first time from carousel products', async ({
    page,
  }) => {
    await page.goto('/')

    const arrowLeft = page.getByTestId('arrow_control_left_allProducts')

    await expect(arrowLeft).toBeHidden()
  })

  test('should be able to slide carousel via right arrow and left arrow from carousel products', async ({
    page,
  }) => {
    await page.goto('/')

    await page.addStyleTag({
      content:
        '* { transition-duration: 0s !important; animation-duration: 0s !important; }',
    })

    await page.waitForSelector('.slick-slide')

    await page
      .getByTestId('arrow_control_right_allProducts')
      .waitFor({ state: 'visible', timeout: 50000 })
    await page.getByTestId('arrow_control_right_allProducts').click()

    await page.waitForTimeout(500)

    await page
      .getByTestId('arrow_control_left_allProducts')
      .waitFor({ state: 'visible', timeout: 50000 })
    await page.getByTestId('arrow_control_left_allProducts').click()

    await page.waitForTimeout(500)

    const arrowLeft = page.getByTestId('arrow_control_left_allProducts')

    await expect(arrowLeft).toBeHidden()
  })

  test('should be able to hide the right arrow when the slider gets finished', async ({
    page,
  }) => {
    await page.goto('/')

    const arrowRight = page.getByTestId('arrow_control_right_allProducts')

    while (await arrowRight.isVisible()) {
      await arrowRight.click()
      await page.waitForTimeout(1000)
    }

    await expect(page.locator('arrow_control_right_allProducts')).toBeHidden()
  })

  test('should be not able view the right and left arrows when you have less than 4 products in the carousel', async ({
    page,
  }) => {
    await page.goto('/')

    const arrowRight = page.locator('arrow_control_right_allProducts')
    const arrowLeft = page.locator('arrow_control_left_allProducts')

    await expect(arrowRight).toBeHidden()
    await expect(arrowLeft).toBeHidden()
  })
})
