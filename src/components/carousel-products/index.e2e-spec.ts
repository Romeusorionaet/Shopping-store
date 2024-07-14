import { test, expect } from '../../../test/mocks/playwright-msw'

test.describe('Carousel Products (E2E)', () => {
  test('should not be able view the left arrow in first time from carousel products', async ({
    page,
  }) => {
    await page.goto('/')

    const arrowLeft = page.getByTestId('arrow_control_right_allProducts')

    expect(arrowLeft).toBeHidden()
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

    await page.getByTestId('arrow_control_right_allProducts').waitFor()

    const arrowRight = page.getByTestId('arrow_control_right_allProducts')

    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(1000)
      await arrowRight.click()
    }

    await page.waitForLoadState('networkidle')

    await expect(arrowRight).toBeHidden()
  })
})
