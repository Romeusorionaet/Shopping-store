/* eslint-disable camelcase */
'use server'

import { CartProduct } from '@/providers/zustand-store'
import mercadopago from 'mercadopago'

type PreferenceItem = {
  title: string
  unit_price: number
  currency_id: 'BRL' | 'USD'
  description: string
  quantity: number
}

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
})

const truncateDescription = (
  description: string,
  maxLength: number,
): string => {
  if (description.length > maxLength) {
    return `${description.slice(0, maxLength - 3)}...`
  }
  return description
}

export const createCheckout = async (
  products: CartProduct[],
  orderId: string,
) => {
  try {
    const items: PreferenceItem[] = products.map((product) => ({
      title: product.name,
      unit_price: 0.01, // Number(product.totalPrice),
      currency_id: 'BRL',
      description: truncateDescription(product.description, 256),
      quantity: product.quantity,
    }))

    const preference: {
      items: PreferenceItem[]
      back_urls: {
        success: string
        failure: string
      }
      auto_return: 'approved' | 'all' | undefined
      external_reference: string
    } = {
      items,
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000',
      },
      auto_return: 'approved',
      external_reference: orderId,
    }

    const initPointUrl = await mercadopago.preferences
      .create(preference)
      .then((data) => data.response.init_point)

    return initPointUrl
  } catch (error) {
    console.error(error)
    return error
  }
}
