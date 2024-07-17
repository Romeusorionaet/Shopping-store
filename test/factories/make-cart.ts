import { CartProps } from '@/providers/zustand-store'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { ModeOfSale } from '@/core/@types/api-store'

export function makeCart(overrides: Partial<CartProps>[] = [{}]): CartProps[] {
  const uuid = randomUUID()

  const price = faker.number.int({ min: 100, max: 500 })
  const quantity = faker.number.int({ min: 1, max: 5 })

  const totalPrice = price * quantity

  return overrides.map((override) => {
    const cart: CartProps = {
      id: uuid,
      categoryId: uuid,
      totalPrice,
      quantity,
      price,
      categoryTitle: faker.lorem.words(),
      title: faker.lorem.words(),
      slug: faker.lorem.slug(),
      description: faker.lorem.text(),
      imgUrlList: [
        `https://store.${faker.lorem.slug()}.com`,
        `https://store.${faker.lorem.slug()}.com`,
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

    return cart
  })
}
