'use server'

import { api } from '../api'

interface ProfileProps {
  id: string
  username: string
  email: string
  createAt: string
  updateAt: string
}

export const getDataUser = async (accessToken: string) => {
  console.log(accessToken, '==from getUser')
  try {
    const response = await api.get('/buyer/profile', {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    })

    const profile: ProfileProps = response.data.profile

    return {
      props: {
        profile,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err: any) {
    return {
      message: 'Something went wrong while fetching the user.',
      error: err.message,
    }
  }
}
