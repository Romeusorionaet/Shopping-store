'use server'

import { api } from '../api'

interface ProfileProps {
  id: string
  username: string
  email: string
  createAt: string
  updateAt: string
}

export const getDataUser = async (accessToken: string | undefined) => {
  try {
    const response = await api.get('/buyer/profile', {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
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
