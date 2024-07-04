import { checkIsPrivateRoute } from './check-is-private-route'

describe('Check is private route', () => {
  test('should be able return true if the route be private', () => {
    const result = checkIsPrivateRoute('/control-adm')

    expect(result).toEqual(true)
  })

  test('should be able return false if the route be public', () => {
    const result = checkIsPrivateRoute('/signIn')

    expect(result).toBeFalsy()
  })
})
