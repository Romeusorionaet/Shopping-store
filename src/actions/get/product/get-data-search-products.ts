import { api } from '@/lib/api'

interface Props {
  page?: number
  query?: string
  section?: string
  categoryId?: string
}

export const getDataSearchProducts = async ({
  page,
  query,
  section,
  categoryId,
}: Props) => {
  try {
    const response = await api.get('products/search', {
      params: { page, query, section, categoryId },
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
