import { randomUUID } from 'crypto'
import { ProfileProps } from '@/core/@types/api-store'
import { faker } from '@faker-js/faker'

export function makeUser(override: Partial<ProfileProps> = {}): ProfileProps {
  const uuid = randomUUID()
  const username = faker.person.firstName()

  const profile: ProfileProps = {
    publicId: uuid,
    username: faker.person.fullName(),
    email: `${username}@gmail.com`,
    picture: '09c89cf4-57fb-4a52-892c-9cdb10b9054b-vhuxce.jpg',
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),

    ...override,
  }

  return profile
}
