import { api } from '../api'

export const getDataProducts = async () => {
  try {
    const response = await api.get('products')

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
