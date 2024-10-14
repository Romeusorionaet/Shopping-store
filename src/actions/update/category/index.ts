'use server'

import { CategoryFormData } from '@/app/(admin)/category-manage/components/category-form/form'
import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

interface Props {
  category: CategoryFormData
}

export const updateCategory = async (
  category: Props,
): Promise<{ success: boolean; message: string }> => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      success: false,
      message: 'Não autorizado',
    }
  }

  try {
    const response = await api.post(
      '/update/create',
      {
        ...category,
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
