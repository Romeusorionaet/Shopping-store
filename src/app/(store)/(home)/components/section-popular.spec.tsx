import { renderWithProvidersForTests } from '../../../../../test/helpers/render-with-providers-for-test'
import { SectionPopular } from './section-popular'

describe('Section popular', () => {
  test('should be able view the section popular', () => {
    const wrapper = renderWithProvidersForTests(<SectionPopular />)

    expect(wrapper.container).toBeVisible()
  })
})
