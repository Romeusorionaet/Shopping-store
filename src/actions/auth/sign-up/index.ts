'use server'

import { api } from '@/lib/api'

interface Props {
  username: string
  email: string
  password: string
  picture: string
}

interface ResponseProps {
  success: boolean
  message: string
}

export const signUp = async ({
  username,
  email,
  password,
  picture,
}: Props): Promise<ResponseProps> => {
  try {
    const response = await api.post('/auth/user/register', {
      username,
      email,
      password,
      picture,
    })

    return {
      success: true,
      message: response.data.message,
    }
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error ||
      'Aconteceu um erro inesperado, tente novamente mais tarde.'

    return { success: false, message: errorMessage }
  }
}
