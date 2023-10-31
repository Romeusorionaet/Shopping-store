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

      await prismaClient.order.update({
        where: {
          id: session.metadata.orderId,
        },
        data: {
          status: 'PAYMENT_CONFIRMED',
        },
      })
    }

    if (event.type === 'checkout.session.expired') {
      console.log('checkout.session.expired')
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      console.log('checkout.session.async_payment_failed')
    }

    if (event.type === 'checkout.session.async_payment_succeeded') {
      console.log('checkout.session.async_payment_succeeded')
    }
  } catch (err) {
    alert(err)
  }

  return NextResponse.json({ received: true })
}
