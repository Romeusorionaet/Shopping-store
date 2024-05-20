import { api } from '../api'

export const getDataCatalog = async () => {
  try {
    const response = await api.get('/categories')

    return {
      propsCategories: {
        categories: JSON.stringify(response.data.categories),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    return {
      notFound: true,
      propsCategories: { categories: '[]' },
    }
  }
}
