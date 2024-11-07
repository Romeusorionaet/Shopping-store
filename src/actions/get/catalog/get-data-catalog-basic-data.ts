import { api } from '@/lib/api'

export const getCatalogBasicData = async () => {
  try {
    const response = await api.get(`/categories/basic-data`)

    return {
      props: {
        categoriesBasicData: JSON.stringify(response.data.categoriesBasicData),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,
      props: { categoriesBasicData: '[]' },
    }
  }
}
