import { api } from '@/lib/api'

interface Props {
  page: number
}

export const getDataProducts = async ({ page }: Props) => {
  try {
    const response = await api.get('products', { params: { page } })

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
      revalidate: 0,
    }
  }
}
