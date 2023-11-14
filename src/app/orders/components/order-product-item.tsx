import { Prisma } from '@prisma/client'
import Image from 'next/image'

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

export function OrderProductItem({ orderProduct }: OrderProductItemProps) {
  let total = 0

  const currentTotalDiscount =
    Number(orderProduct.basePrice) *
    (orderProduct.discountPercentage / 100) *
    orderProduct.quantity
  const currentTotalPrice =
    Number(orderProduct.basePrice) * orderProduct.quantity -
    currentTotalDiscount
  total += currentTotalPrice

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-amber-50">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%]"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex w-fit rounded-md px-3 py-1">
          <p className="text-[10px]">
            Vendido e entregue por{' '}
            <span className="font-bold">shopping-store</span>
          </p>
        </div>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">R$ {total.toFixed(2)}</p>

            {orderProduct.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(orderProduct.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-xs opacity-60">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  )
}
