import { normalizeAndSortData } from './normalize-and-sort-data'

describe('Normalize and Sort Data', () => {
  test('should normalize and sort object data', () => {
    const data = { c: 'hello', a: 'world', b: 'foo' }
    const expected = { a: 'world', b: 'foo', c: 'hello' }

    const result = normalizeAndSortData(data)

    expect(result).toEqual(expected)
  })

  test('should normalize and sort array of objects data', () => {
    const data = [{ b: 'foo' }, { a: 'world' }, { c: 'hello' }]
    const expected = [{ a: 'world' }, { b: 'foo' }, { c: 'hello' }]

    const result = normalizeAndSortData(data)

    expect(result).toEqual(expected)
  })

  test('should handle mixed data types correctly', () => {
    const data = {
      a: [{ b: 'foo' }, { c: 'bar' }],
      b: 42,
      c: 'hello',
      d: null,
    }
    const expected = {
      a: [{ b: 'foo' }, { c: 'bar' }],
      b: '42',
      c: 'hello',
      d: 'null',
    }

    const result = normalizeAndSortData(data)

    expect(result).toEqual(expected)
  })

  test('should handle primitive types', () => {
    const data = 'hello world'
    const expected = 'hello world'

    const result = normalizeAndSortData(data)

    expect(result).toEqual(expected)
  })
})
