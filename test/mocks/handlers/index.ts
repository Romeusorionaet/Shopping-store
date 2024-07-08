import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/products', async () => {
    return HttpResponse.json(
      {
        products: [
          {
            id: 'fd226aeb-d789-470c-ad6e-ea446e67ddc2',
            categoryId: '9cf11f98-d45b-4d6b-a1da-a3d548c3c737',
            categoryTitle: 'Realme',
            title: 'Realme Note 50',
            slug: 'realme-note-50',
            description: 'Ldes rfde ouvido.',
            price: 2950,
            imgUrlList: ['327c4690-2d21-4c85-ab9b-f2707c957d17-la7oec.png'],
            corsList: ['Azul'],
            stockQuantity: 10,
            minimumQuantityStock: 5,
            discountPercentage: 8,
            placeOfSale: 'ONLINE_STORE',
            stars: 0,
            createdAt: '2024-07-01T01:05:52.834Z',
            updatedAt: '2024-07-01T01:05:52.834Z',
          },
        ],
      },
      {
        status: 200,
      },
    )
  }),
]
