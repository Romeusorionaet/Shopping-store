import { api } from '../api'

interface Props {
  page?: number
  query?: string
  section?: string
}

export const getDataSearchProducts = async ({
  page,
  query,
  section,
}: Props) => {
  try {
    const response = await api.get('products/search', {
      params: { page, query, section },
    })

    return {
      props: {
        products: JSON.stringify(response.data.products),
      },
      revalidate: 60 * 60 * 24,
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
