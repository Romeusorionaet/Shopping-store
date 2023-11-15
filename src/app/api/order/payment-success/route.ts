import { prismaClient } from '@/lib/prisma'
import { initializeStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

const stripe = initializeStripe()

export const POST = async (req: Request) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.error()
  }

  const text = await req.text()

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
    400,
  )

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any

      await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ['line_items'],
      })

      const order = await prismaClient.order.update({
        where: {
          id: session.metadata.orderId,
        },
        include: {
          orderProducts: true,
        },
        data: {
          status: 'PAYMENT_CONFIRMED',
        },
      })

      const listOfQuantityOfProductsSold = order.orderProducts

      for (const productSold of listOfQuantityOfProductsSold) {
        const productId = productSold.productId
        const quantitySold = productSold.quantity

        await prismaClient.product.update({
          where: {
            id: productId,
          },
          data: {
            quantity: {
              decrement: quantitySold,
            },
          },
        })
      }
    }
  } catch (err) {
    console.log(err)
  }

  return NextResponse.json({ received: true })
}
