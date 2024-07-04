import { makeCart } from '../../test/factories/make-cart'
import { calculateCartAllValues } from './calculate-cart-all-values'

describe('Calculate cart all values', () => {
  test('should be able return subtotal, totalDiscount and total of cart', () => {
    const cart = makeCart([
      { title: 'Product 1', quantity: 1, price: 200, discountPercentage: 10 },
      { title: 'Product 2', quantity: 2, price: 500, discountPercentage: 20 },
    ])

    const result = calculateCartAllValues(cart)

    expect(result).toEqual(
      expect.objectContaining({
        total: 980,
        totalDiscount: 220,
        subtotal: 1200,
      }),
    )
  })
})
