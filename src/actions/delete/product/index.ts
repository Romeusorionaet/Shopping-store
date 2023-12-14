'use server'

import { OrderStatus, OrderStatusTracking, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteProduct = async (productId: string) => {
  try {
    const ordersProduct = await prisma.orderProduct.findMany({
      where: {
        productId,
      },
      include: {
        order: true,
      },
    })

    const hasOrderProductWithExpectedStatus = ordersProduct.find(
      (orderProduct) =>
        (orderProduct.order.orderTracking === OrderStatusTracking.WAITING ||
          orderProduct.order.orderTracking ===
            OrderStatusTracking.PRODUCT_DELIVERED_TO_CORREIOS) &&
        orderProduct.order.status === OrderStatus.PAYMENT_CONFIRMED,
    )

    if (!hasOrderProductWithExpectedStatus) {
      await prisma.product.delete({
        where: {
          id: productId,
        },
      })

      const countOrderProducts = await prisma.order.findUnique({
        where: {
          id: ordersProduct[0].orderId,
        },
        include: {
          orderProducts: true,
        },
      })

      if (countOrderProducts?.orderProducts.length === 0) {
        await prisma.order.delete({
          where: {
            id: countOrderProducts.id,
          },
        })
      }

      return { messageSuccess: 'Produto deletado' }
    } else {
      return {
        messageWarning:
          'Produto em processo com cliente, não pode ser deletado no momento',
      }
    }
  } catch (err) {
    console.log(err)
    return { messageError: 'Error ao deletar produto' }
  }
}
