import { api } from '../api'

export const getDataProductsTheSameCategory = async (categoryId: string) => {
  try {
    const response = await api.get('/products/same-category', {
      params: {
        categoryId,
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
      revalidate: 0,
    }
  }
}
