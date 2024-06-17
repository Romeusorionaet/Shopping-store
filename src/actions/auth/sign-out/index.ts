'use server'

import { KeyCookies } from '@/constants/key-cookies'
import { cookies } from 'next/headers'

export async function cleanAuthCookies() {
  cookies().delete(KeyCookies.AT_STORE)
  cookies().delete(KeyCookies.RT_STORE)

  return
}
