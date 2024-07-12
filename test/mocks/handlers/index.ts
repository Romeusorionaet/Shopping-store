import { http, HttpResponse } from 'msw'
import { makeProduct } from '../../factories/make-product'
import { makeUser } from '../../factories/make-user'
import { fakeEncrypterToken } from '../../cryptography/fake-token'

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
    console.log('7787=order-products-not-paym...')
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
    console.log('passou aqui ===1')

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

  // http.post('/auth/user/register', async () => {
  //   return HttpResponse.json({
  //     username: 'Romeu soares',
  //     email: 'romeu@gmail.com',
  //     password: 123456,
  //     picture: '09c89cf4-57fb-4a52-892c-9cdb10b9054b-vhuxce.jpg',
  //   })
  // }),

  // http.post('/signIn', async () => {
  //   console.log('passou aqui ===22222')

  //   return HttpResponse.json(
  //     {
  //       success: true,
  //       message: 'ok',
  //       data: {
  //         accessToken: 'fakeAccessToken',
  //         refreshToken: 'fakeRefreshToken',
  //       },
  //     },
  //     {
  //       status: 200,
  //     },
  //   )
  // }),

  http.post('/auth/user/authenticate', async () => {
    console.log('passou aqui ===2')

    return HttpResponse.json(
      {
        success: true,
        message: 'ok',
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
]
