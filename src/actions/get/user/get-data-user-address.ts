'use server'

import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { AddressProps } from '@/core/@types/api-store'
import { api } from '@/lib/api'

export interface GetDataUserAddressResponse {
  props: {
    userAddress: AddressProps | null
  }
  notFound?: boolean
}

export const getDataUserAddress =
  async (): Promise<GetDataUserAddressResponse> => {
    const accessToken = getAccessTokenFromCookies()

    try {
      const response = await api.get('/user/get-address', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const userAddress: AddressProps = response.data.userAddress

      return {
        props: {
          userAddress,
        },
      }
    } catch (err) {
      return {
        notFound: true,
        props: {
          userAddress: null,
        },
      }
    }
  }
