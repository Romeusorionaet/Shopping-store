'use server'

import { api } from '../api'

export const getDataUserAddress = async (
  userId: string,
  accessToken: string,
) => {
  try {
    const response = await api.get(`/user/get-address/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      props: {
        tokens: response.data.userAddress,
      },
    }
  } catch (err: any) {
    if (err.response) {
      return err.response.data.error
    }
  }
}
