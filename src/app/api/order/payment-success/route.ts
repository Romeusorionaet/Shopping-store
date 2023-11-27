import { prismaClient } from '@/lib/prisma'
import axios from 'axios'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const signature = req.headers.get('x-hookdeck-signature')
  // const signatureVerifield = req.headers.get('x-hookdeck-verified')

  if (!signature) {
    return NextResponse.error()
  }

  try {
    const result = await req.json()

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    }

    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${result.data.id}`,
      {
        headers,
      },
    )

    if (response.data.status === 'approved') {
      const orderId = response.data.external_reference
      const order = await prismaClient.order.update({
        where: {
          id: orderId,
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

        // testar fazer a mesma compra em dois dispositivos diferentes para ver se
        // quantity pode ficar negativo caso seu valor inicial for 1
        // se causar erro poode haver uma solução
        // permitir que quantity fique negativo

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
