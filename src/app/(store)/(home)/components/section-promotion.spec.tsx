import { renderWithProvidersForTests } from '../../../../../test/helpers/render-with-providers-for-test'
import { SectionPromotion } from './section-promotion'

describe('Section promotion', () => {
  test('should be able view the section promotion', () => {
    const wrapper = renderWithProvidersForTests(<SectionPromotion />)

    expect(wrapper.container).toBeVisible()
  })
})
