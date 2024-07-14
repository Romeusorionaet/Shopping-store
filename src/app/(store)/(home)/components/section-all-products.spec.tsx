import { SectionAllProducts } from './section-all-products'
import { renderWithProvidersForTests } from '../../../../../test/helpers/render-with-providers-for-test'

describe('Section all products', () => {
  test('should be able view the section all products', () => {
    const wrapper = renderWithProvidersForTests(<SectionAllProducts />)

    expect(wrapper.container).toBeVisible()
  })
})
