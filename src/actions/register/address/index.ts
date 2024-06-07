'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

interface Props {
  cep: number
  city: string
  uf: string
  street: string
  neighborhood: string
  houseNumber: number
  complement: string
  phoneNumber: string
  username: string
  email: string
}

export const createUserAddress = async (
  address: Props,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = getAccessTokenFromCookies()

  try {
    const response = await api.post(
      '/user/create-address',
      {
        ...address,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return { success: true, message: response.data.message }
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error ||
      'Aconteceu um erro inesperado, tente novamente mais tarde.'

    return { success: false, message: errorMessage }
  }
}
