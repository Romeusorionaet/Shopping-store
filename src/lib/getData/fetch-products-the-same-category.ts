import { api } from '../api'

export const fetchProductsTheSameCategory = async (slug: string) => {
  try {
    const response = await api.get('/products/same-category', {
      params: {
        slug,
        page: 1,
      },
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
    }
  }
}
