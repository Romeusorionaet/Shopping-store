import { SlugGenerator } from './slug-generator'

describe('Slug generation', () => {
  test('should be able show information for the user can be able accept the therms', () => {
    const slug = SlugGenerator.createFromText('Example question title çê-')

    expect(slug.value).toEqual('example-question-title-ce')
  })
})
