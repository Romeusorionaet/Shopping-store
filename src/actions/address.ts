'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

interface Props {
  cep: string
  city: string
  uf: string
  street: string
  neighborhood: string
  houseNumber: string
  complement: string
  phoneNumber: string
  username: string
  email: string
}

export const createUserAddress = async (
  address: Props,
  userId: string,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = getAccessTokenFromCookies()

  try {
    await api.post(
      '/user/create-address',
      {
        userId,
        ...address,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return { success: true, message: '' }
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || err.message

    return { success: false, message: errorMessage }
  }
}
