import { CalculateValueProduct } from './calculate-value-product'

describe('Calculate value product', () => {
  test('should be able return value of product', () => {
    const { totalPrice } = CalculateValueProduct({
      basePrice: 200,
      discountPercentage: 15,
    })

    expect(totalPrice).toEqual(170)
  })
})
