import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'

interface Props {
  time: number | string
}

export function fakeEncrypterToken({ time }: Props) {
  const fakeToken = jwt.sign({ id: randomUUID() }, 'secretKey', {
    expiresIn: time,
  })
  return { fakeToken }
}
