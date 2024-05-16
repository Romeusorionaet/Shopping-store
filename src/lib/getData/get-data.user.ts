'use server'

import { api } from '../api'

interface ProfileProps {
  id: string
  username: string
  email: string
  createAt: string
  updateAt: string
}

export const getDataUser = async () => {
  try {
    console.log(
      process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      process.env.NEXTAUTH_URL,
      '===teste',
    )
    const response = await api.get('/buyer/profile')
    console.log(response, '=====response')

    const profile: ProfileProps = response.data.profile

    return {
      props: {
        profile,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    return {
      error: 'Something went wrong while fetching the user.',
    }
  }
}
