'use server'

import { api } from '@/lib/api'
import { getTokenFromCookies } from '@/utils/get-tokens-from-cookies'

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

export const updateUserAddress = async (
  address: Props,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = getTokenFromCookies.accessToken()

  if (!accessToken) {
    return {
      success: false,
      message: 'Não autorizado',
    }
  }

  try {
    const response = await api.put(
      '/user/update-user-address',
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
    const errorMessage = err.response?.data?.error || err.message

    return { success: false, message: errorMessage }
  }
}
