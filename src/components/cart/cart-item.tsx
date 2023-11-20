import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from 'lucide-react'
import { CartProduct, useCartStore } from '@/providers/zustand-store'
import Link from 'next/link'

interface CartItemProps {
  product: CartProduct
}

export function CartItem({ product }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useCartStore()

  const basePrice = Number(product.basePrice) * product.quantity

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
    <div className="flex flex-col gap-2 items-center justify-between">
      <p className="text-xs whitespace-nowrap">{product.name}</p>

      <div className="flex gap-1">
        <div className="flex w-[40%] items-center justify-center rounded-md">
          <Link href={`/details/${product.slug}`}>
            <Image
              src={product.imageUrls[0]}
              width={0}
              height={0}
              sizes="100vw"
              alt={product.name}
              className="w-full h-full"
            />
          </Link>
        </div>

        <div className="flex w-[40%] flex-col items-center gap-2">
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

            <span className="">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
        <Button
          size="icon"
          variant={'destructive'}
          onClick={handleRemoveProductClick}
        >
          <TrashIcon size={22} />
        </Button>
      </div>
    </div>
  )
}
