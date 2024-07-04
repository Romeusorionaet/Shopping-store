import { fakeEncrypterToken } from '../../test/cryptography/fake-token'
import { extractExpirationTimeFromJwtToken } from './extract-expiration-time-from-jwt-token'

describe('Extract expiration time from JWT token', () => {
  test('should be able return expiration time', () => {
    const { fakeToken } = fakeEncrypterToken({ time: '30m' })

    const expirationTime = extractExpirationTimeFromJwtToken(fakeToken)

    const currentTime = Math.floor(Date.now() / 1000)
    const timeDifferenceInSeconds = expirationTime - currentTime
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60

    expect(timeDifferenceInMinutes).toEqual(30)
  })
})
