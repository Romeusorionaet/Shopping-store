import { getDiscountStyleClass } from './get-discount-style-class'

describe('Categorize discount', () => {
  test('should be able return the category of discount', () => {
    const { styleDiscountPercentage } = getDiscountStyleClass({
      discountPercentage: 40,
    })
    expect(styleDiscountPercentage).toEqual(
      'text-red-500 bg-gradient-to-t from-red-500 via-transparent to-transparent border-b-4 border-red-500',
    )
  })
})
