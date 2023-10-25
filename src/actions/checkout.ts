'use server'

import { initializeStripe } from '@/lib/stripe'
import { CartProduct } from '@/providers/zustand-store'

export const createCheckout = async (
  products: CartProduct[],
  orderId: string,
) => {
  const stripe = initializeStripe()

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.HOST_URL}/success`,
    cancel_url: process.env.HOST_URL,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => {
      const totalDiscount =
        Number(product.basePrice) * (product.discountPercentage / 100)
      const totalPrice = Number(product.basePrice) - totalDiscount
      const totalPriceInCents = Math.round(totalPrice * 100)

      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: totalPriceInCents,
        },
        quantity: product.quantity,
      }
    }),
  })

  return checkout
}
