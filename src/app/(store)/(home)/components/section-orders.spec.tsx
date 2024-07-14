import { renderWithProvidersForTests } from '../../../../../test/helpers/render-with-providers-for-test'
import { SectionOrders } from './section-orders'

describe('Section orders', () => {
  test('should be able view the section orders', () => {
    const wrapper = renderWithProvidersForTests(<SectionOrders />)

    expect(wrapper.container).toBeVisible()
  })
})
