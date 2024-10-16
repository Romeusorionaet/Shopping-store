import { api } from '@/lib/api'

export const getDataUniqueCategory = async (categoryId: string) => {
  try {
    const response = await api.get(`/category/details/${categoryId}`)

    return {
      props: {
        category: JSON.stringify(response.data.category),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,
      revalidate: 0,
      props: { category: null },
    }
  }
}
