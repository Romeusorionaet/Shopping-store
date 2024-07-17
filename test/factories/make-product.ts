import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { ModeOfSale, ProductProps } from '@/core/@types/api-store'

export function makeProduct(
  override: Partial<ProductProps> = {},
): ProductProps {
  const uuid = randomUUID()

  const product: ProductProps = {
    id: uuid,
    categoryId: uuid,
    price: faker.number.int({ min: 100, max: 500 }),
    categoryTitle: faker.lorem.words(),
    title: faker.lorem.words(),
    slug: faker.lorem.slug(),
    description: faker.lorem.text(),
    imgUrlList: [
      `327c4690-2d21-4c85-ab9b-f2707c957d17-la7oec.png`,
      `327c4690-2d21-4c85-ab9b-f2707c957d17-la7oec.png`,
    ],
    corsList: [`${faker.color.human()}`, `${faker.color.human()}`],
    stockQuantity: 10,
    minimumQuantityStock: 2,
    discountPercentage: faker.number.int({ min: 0, max: 50 }),
    placeOfSale: ModeOfSale.ONLINE_STORE,
    stars: faker.number.int({ min: 0, max: 100 }),
    createdAt: new Date(),
    updatedAt: null,

    ...override,
  }

  return product
}
