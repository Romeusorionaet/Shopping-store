import { randomUUID } from 'crypto'
import { AddressProps } from '@/core/@types/api-store'
import { faker } from '@faker-js/faker'

export function makeAddress(
  override: Partial<AddressProps> = {},
): AddressProps {
  const uuid = randomUUID()

  const address: AddressProps = {
    id: uuid,
    orderId: uuid,
    buyerId: uuid,
    cep: 12345678,
    city: faker.lorem.sentence(2),
    uf: faker.lorem.word(2),
    street: faker.lorem.sentence(3),
    neighborhood: faker.lorem.sentence(3),
    houseNumber: 489,
    complement: faker.lorem.sentence(4),
    phoneNumber: '1234567891',
    username: faker.person.fullName(),
    email: 'example@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),

    ...override,
  }

  return address
}
