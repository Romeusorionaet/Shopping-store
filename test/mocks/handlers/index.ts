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

  http.post('/actionType=upload&slug=imageProfileShoppingStore', async () => {
    console.log('passou aqui upload====1111111=========')

    return HttpResponse.json(
      {
        key: 'e7fbf5e8-a0b7-4f34-9752-462f042f9ffa-2i8.jpg',
        fileName: 'eu.jpg',
        fileType: 'image',
        fileUrl:
          'https://utfs.io/f/e7fbf5e8-a0b7-4f34-9752-462f042f9ffa-2i8.jpg',
        pollingJwt:
          'JoOoBtVa58T6pOAr6+rUnA==:KBIDXwkf1l6yzZSbHNoy/Q8fvGg0cElD8A8s/I1YkTmzZHxsT/UFsxNzGU4LqgDC/OJFs4g+isB0waY7EsSa0my/xk7W4TkwIIulphituMdCaw8Qsm4WcuNs',
        pollingUrl: 'https://api.uploadthing.com/v6/serverCallback',
        url: 'https://uploadthing-prod.s3.us-west-2.amazonaws.com/',
        contentDisposition: 'inline',
        customId: null,
        fields: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition':
            'inline; filename="eu.jpg"; filename*=UTF-8\'\'eu.jpg',
          bucket: 'uploadthing-prod',
          'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
          'X-Amz-Credential':
            'AKIA4BVCOYKVWQXJFN4V/20240715/us-west-2/s3/aws4_request',
          'X-Amz-Date': '20240715T172727Z',
          key: 'e7fbf5e8-a0b7-4f34-9752-462f042f9ffa-2i8.jpg',
          Policy:
            'eyJleHBpcmF0aW9uIjoiMjAyNC0wNy0xNVQxNzozMjoyN1oiLCJjb25kaXRpb25zIjpbWyJlcSIsIiRDb250ZW50LVR5cGUiLCJpbWFnZS9qcGVnIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw5NjE1Nl0sWyJlcSIsIiRDb250ZW50LURpc3Bvc2l0aW9uIiwiaW5saW5lOyBmaWxlbmFtZT1cImV1LmpwZ1wiOyBmaWxlbmFtZSo9VVRGLTgnJ2V1LmpwZyJdLHsiQ29udGVudC1UeXBlIjoiaW1hZ2UvanBlZyJ9LHsiQ29udGVudC1EaXNwb3NpdGlvbiI6ImlubGluZTsgZmlsZW5hbWU9XCJldS5qcGdcIjsgZmlsZW5hbWUqPVVURi04JydldS5qcGcifSx7ImJ1Y2tldCI6InVwbG9hZHRoaW5nLXByb2QifSx7IlgtQW16LUFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJBS0lBNEJWQ09ZS1ZXUVhKRk40Vi8yMDI0MDcxNS91cy13ZXN0LTIvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyNDA3MTVUMTcyNzI3WiJ9LHsia2V5IjoiZTdmYmY1ZTgtYTBiNy00ZjM0LTk3NTItNDYyZjA0MmY5ZmZhLTJpOC5qcGcifV19',
          'X-Amz-Signature':
            '4b402211ea10c044cf335317b891dcde16b4771103c366b33335e51303bd9d7c',
        },
      },
      {
        status: 200,
      },
    )
  }),

  http.post('https://api.uploadthing.com/v6/serverCallback', async () => {
    console.log('passou aqui upload======222222=======')

    return HttpResponse.json(
      { status: 'done', callbackData: { uploadedBy: 'fakeId' } },
      {
        status: 200,
      },
    )
  }),

  http.post(
    'https://uploadthing-prod.s3.us-west-2.amazonaws.com/',
    async () => {
      console.log('passou aqui upload======333333333=======')

      return HttpResponse.json({
        status: 200,
      })
    },
  ),

  http.options(
    'https://uploadthing-prod.s3.us-west-2.amazonaws.com/',
    async () => {
      console.log('passou aqui upload======444444444=======')

      return HttpResponse.json({
        status: 200,
      })
    },
  ),
]
