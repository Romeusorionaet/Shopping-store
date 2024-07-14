import { test, expect } from '../../../test/mocks/playwright-msw'

test.describe('Carousel Products (E2E)', () => {
  test('should not be able view the left arrow in first time from carousel products', async ({
    page,
  }) => {
    await page.goto('/')

    const arrowLeft = page.getByTestId('arrow_control_left_allProducts')

    await expect(arrowLeft).toBeHidden()
  })

  test('should be able slider carousel via right arrow and left arrow from carousel products', async ({
    page,
  }) => {
    await page.goto('/')

    await page.getByTestId('arrow_control_right_allProducts').waitFor()

    const arrowRight = page.getByTestId('arrow_control_right_allProducts')

    await arrowRight.dblclick()

    const arrowLeft = page.getByTestId('arrow_control_left_allProducts')

    await arrowLeft.dblclick()

    await page.waitForTimeout(500)
  })

  test('Should be able to hide the right arrow when the slider gets finished', async ({
    page,
  }) => {
    await page.goto('/')

    const arrowRight = page.getByTestId('arrow_control_right_allProducts')

    await arrowRight.waitFor()

    while (await arrowRight.isVisible()) {
      await arrowRight.click()
      await page.waitForTimeout(1000)
    }

    await expect(page.locator('arrow_control_right_allProducts')).toBeHidden()
  })
})
