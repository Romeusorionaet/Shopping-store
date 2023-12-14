'use server'

import {
  Address,
  OrderStatus,
  OrderStatusTracking,
  PrismaClient,
} from '@prisma/client'

const prisma = new PrismaClient()

interface Props {
  orderId: string
  trackingCode?: OrderStatus | string
  orderTracking?: OrderStatusTracking
  userAddress?: Address
}

export const updateOrder = async ({
  orderId,
  trackingCode,
  orderTracking,
  userAddress,
}: Props) => {
  try {
    if (trackingCode && userAddress) {
      await prisma.orderAddress.createMany({
        data: {
          orderId,
          cep: userAddress.cep,
          city: userAddress.city,
          complement: userAddress.complement,
          email: userAddress.email,
          neighborhood: userAddress.neighborhood,
          number: userAddress.number,
          phoneNumber: userAddress.phoneNumber,
          street: userAddress.street,
          uf: userAddress.uf,
          username: userAddress.username,
        },
      })

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          trackingCode,
          orderTracking: OrderStatusTracking.PRODUCT_DELIVERED_TO_CORREIOS,
        },
      })

      return { messageSuccess: 'Código inserido com sucesso' }
    }

    if (orderTracking) {
      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          orderTracking,
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
          orderAddress: true,
        },
      })

      const userOrdersHistoricData = order.orderProducts.map((item) => ({
        userId: order.userId,
        name: item.product.name,
        basePrice: item.product.basePrice,
        discountPercentage: item.product.discountPercentage,
        quantity: item.quantity,
        imageUrl: item.product.imageUrls[0],
        createdAt: order.createdAt,
        cep: order.orderAddress[0].cep,
        city: order.orderAddress[0].city,
        complement: order.orderAddress[0].complement,
        email: order.orderAddress[0].email,
        neighborhood: order.orderAddress[0].neighborhood,
        number: order.orderAddress[0].number,
        phoneNumber: order.orderAddress[0].phoneNumber,
        street: order.orderAddress[0].street,
        uf: order.orderAddress[0].uf,
        username: order.orderAddress[0].username,
      }))

      await prisma.userOrdersHistoric.createMany({
        data: userOrdersHistoricData,
      })

      return {
        messageSuccess: 'Este pedido agora está na seção Pedidos Entregues',
      }
    }
  } catch (err) {
    console.log(err)
    return { messageError: 'Error ao inserir código' }
  }
}
