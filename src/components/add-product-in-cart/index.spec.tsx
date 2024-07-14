import { fireEvent, render, screen } from '@testing-library/react'
import { AddProductInCart } from '.'
import { makeProduct } from '../../../test/factories/make-product'

describe('Add product in cart', () => {
  test('should be able view the section all products', async () => {
    const product = makeProduct()

    const wrapper = render(<AddProductInCart product={product} />)

    expect(wrapper.container).toBeVisible()

    fireEvent.click(wrapper.getByTestId(product.id))

    const toast = screen.findByRole('alert')

    expect(toast).toBeTruthy()
  })
})
