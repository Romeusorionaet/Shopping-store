import { http, HttpResponse } from 'msw'
import { makeProduct } from '../../factories/make-product'
import { makeUser } from '../../factories/make-user'
import { fakeEncrypterToken } from '../../cryptography/fake-token'
import { makeAddress } from '../../factories/make-address'

const { fakeToken } = fakeEncrypterToken({ time: '30m' })

export const handlers = [
  http.get('/products', async () => {
    const products = Array.from({ length: 15 }, () => makeProduct())

    return HttpResponse.json(
      {
        products,
      },
      {
        status: 200,
      },
    )
  }),

  http.get('/products/search', async () => {
    const products = Array.from({ length: 15 }, () => makeProduct())

    return HttpResponse.json(
      {
        products,
      },
      {
        status: 200,
      },
    )
  }),

  http.get('/buyer/order/products', async () => {
    const products = Array.from({ length: 2 }, () => makeProduct())

    return HttpResponse.json(
      {
        products,
      },
      {
        headers: {
          authorization: `Bearer ${fakeToken}`,
        },
        status: 200,
      },
    )
  }),

  http.get('/buyer/profile', async () => {
    const user = makeUser()

    return HttpResponse.json(
      {
        profile: user,
      },
      {
        headers: {
          authorization: `Bearer ${fakeToken}`,
        },
        status: 200,
      },
    )
  }),

  http.post('/auth/user/authenticate', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'success',
        data: {
          accessToken: fakeToken,
          refreshToken: fakeToken,
        },
      },
      {
        status: 200,
      },
    )
  }),

  http.post('/auth/user/register', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'success',
      },
      {
        status: 201,
      },
    )
  }),

  http.post('/user/create-address', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'success',
      },
      {
        headers: {
          authorization: `Bearer ${fakeToken}`,
        },
        status: 201,
      },
    )
  }),

  http.post('/user/update-user-address', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'ok',
      },
      {
        headers: {
          authorization: `Bearer ${fakeToken}`,
        },
        status: 201,
      },
    )
  }),

  http.get('/user/get-address', async () => {
    const userAddress = makeAddress()

    return HttpResponse.json(
      {
        userAddress,
      },
      {
        headers: {
          authorization: `Bearer ${fakeToken}`,
        },
        status: 200,
      },
    )
  }),

  http.put('/user/update-user-address', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'success',
      },
      {
        headers: {
          authorization: `Bearer ${fakeToken}`,
        },
        status: 201,
      },
    )
  }),
]
