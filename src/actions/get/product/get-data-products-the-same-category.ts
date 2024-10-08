import { api } from '@/lib/api'

interface Props {
  categoryId: string
  page: number
}

export const getDataProductsTheSameCategory = async ({
  categoryId,
  page,
}: Props) => {
  try {
    const response = await api.get('/products/same-category', {
      params: {
        categoryId,
        page,
      },
    })

    return {
      props: {
        products: JSON.stringify(response.data.products),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,
      props: {
        products: '[]',
      },
    }
  }
}
