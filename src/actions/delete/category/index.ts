import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const deleteCategory = async (id: string) => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      success: false,
      message: 'Não autorizado',
    }
  }

  try {
    const response = await api.delete(`/category/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return { success: true, message: response.data.message }
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error ||
      'Aconteceu um erro inesperado, tente novamente mais tarde.'

    return { success: false, message: errorMessage }
  }
}
