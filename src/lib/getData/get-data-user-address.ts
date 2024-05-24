'use server'

import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { api } from '../api'
import { AddressProps } from '@/core/@types/api-store'

interface GetDataUserAddressResponse {
  props: {
    userAddress?: AddressProps
  }
  revalidate: number
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
        revalidate: 60 * 60 * 24,
      }
    } catch (err) {
      return {
        notFound: true,
        revalidate: 0,
        props: {},
      }
    }
  }
