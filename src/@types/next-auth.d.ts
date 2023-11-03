import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  // sem uso
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}
