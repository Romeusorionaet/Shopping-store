'use server'

import { OrderStatus, OrderStatusTracking, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteCategory = async (categoryId: string) => {
  try {
    const ordersProduct = await prisma.orderProduct.findMany({
      where: {
        product: {
          categoryId,
        },
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
      await prisma.category.delete({
        where: {
          id: categoryId,
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

      return { messageSuccess: 'Categoria deletada.' }
    } else {
      return {
        messageError:
          'Produtos atualmente em processo com clientes estão associados a esta categoria e não podem ser removidos no momento.',
      }
    }
  } catch (err) {
    console.log(err)
    return { messageError: 'Error ao deletar categoria.' }
  }
}
