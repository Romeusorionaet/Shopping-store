'use server'

import { ProductFormData } from '@/app/(admin)/product-manage/components/product-form/form'
import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

interface Props {
  product: ProductFormData
}

export const createProduct = async (
  product: Props,
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
      '/product/create',
      {
        ...product,
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
