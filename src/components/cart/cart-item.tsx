import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react'
import { CartProps, useCartStore } from '@/providers/zustand-store'
import { BaseUrl } from '@/constants/base-url'

export interface CartItemProps {
  product: CartProps
  handleNavigateTo: (route: string) => void
}

export function CartItem({ product, handleNavigateTo }: CartItemProps) {
  const [
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  ] = useCartStore((state) => [
    state.decreaseProductQuantity,
    state.increaseProductQuantity,
    state.removeProductFromCart,
  ])

  const basePrice = Number(product.price) * product.quantity

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id)
  }

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id)
  }

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id)
  }

  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <p className="line-clamp-1 text-xs">{product.title}</p>

      <div className="flex h-40 gap-1 max-md:pr-1">
        <div className="flex w-1/2 items-center justify-center rounded-md">
          <Image
            src={`${BaseUrl.IMG}/${product.imgUrlList[0]}`}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.title}
            className="h-full w-full object-contain"
            onClick={() =>
              handleNavigateTo(`/details/${product.slug}/${product.id}`)
            }
          />
        </div>

        <div className="flex w-1/2 flex-col items-center justify-between gap-2">
          <div className="flex flex-col items-center gap-2">
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                {basePrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
              </p>
            )}

            <p className="text-sm font-bold">
              {product.totalPrice &&
                product.totalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span>{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>

          <Button
            size="icon"
            variant={'destructive'}
            onClick={handleRemoveProductClick}
            className="p-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-base_color_negative"
          >
            <TrashIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
