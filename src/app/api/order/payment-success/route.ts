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

  if (event.type === 'checkout.session.completed') {
    console.log('====entrou aqui=======')
    const session = event.data.object as any

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      },
    )

    const lineItems = sessionWithLineItems.line_items

    console.log('==============', lineItems)

    // ATUALIZAR PEDIDO
    await prismaClient.order.update({
      where: {
        id: session.metadata.orderId,
      },
      data: {
        status: 'PAYMENT_CONFIRMED',
      },
    })
  }

  return NextResponse.json({ received: true })
}
