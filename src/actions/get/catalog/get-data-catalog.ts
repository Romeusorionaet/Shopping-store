import { api } from '@/lib/api'

export const getDataCatalog = async (page?: number) => {
  try {
    const response = await api.get(`/categories?page=${page}`)

    return {
      propsCategories: {
        categories: JSON.stringify(response.data.categories),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,
      propsCategories: { categories: '[]' },
    }
  }
}
