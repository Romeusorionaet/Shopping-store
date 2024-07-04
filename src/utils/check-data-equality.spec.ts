import { checkDataEquality } from './check-data-equality'

describe('Check data equality', () => {
  test('should be able return true for simple string data equality', () => {
    const firstText = 'lorem text 01'
    const secondText = 'lorem text 01'

    const { isSameData } = checkDataEquality(firstText, secondText)

    expect(isSameData).toBeTruthy()
  })

  test('should be able return false for simples string data inequality', () => {
    const firstText = [{ 1: 'lorem text 01' }, true]
    const secondText = [{ 1: 'lorem 02' }, true]

    const { isSameData } = checkDataEquality(firstText, secondText)

    expect(isSameData).toBeFalsy()
  })

  test('should be able return true for different type of data equality', () => {
    /** Object */

    const firstObject = { 1: 'one', 2: 'two' }
    const secondObject = { 1: 'one', 2: 'two' }
    const object = checkDataEquality(firstObject, secondObject)
    expect(object.isSameData).toBeTruthy()

    /** Array */

    const firstArray = [{ 1: 'one', 2: 'two' }]
    const secondArray = [{ 1: 'one', 2: 'two' }]
    const array = checkDataEquality(firstArray, secondArray)
    expect(array.isSameData).toBeTruthy()

    /** Number */

    const firstNumber = 42
    const secondNumber = 42
    const number = checkDataEquality(firstNumber, secondNumber)
    expect(number.isSameData).toBeTruthy()

    /** Boolean */

    const firstBoolean = true
    const secondBoolean = true
    const boolean = checkDataEquality(firstBoolean, secondBoolean)
    expect(boolean.isSameData).toBeTruthy()

    /** Date */

    const firstDate = new Date('2024-07-01')
    const secondDate = new Date('2024-07-01')
    const date = checkDataEquality(firstDate, secondDate)
    expect(date.isSameData).toBeTruthy()
  })
})
