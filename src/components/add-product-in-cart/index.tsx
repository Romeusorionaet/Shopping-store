'use client'

import { ProductProps } from '@/core/@types/api-store'
import { useNotification } from '@/hooks/use-notifications'
import { useCartStore } from '@/providers/zustand-store'
import { BaggageClaim } from 'lucide-react'
import { useState } from 'react'

interface Props {
  product: ProductProps
  title?: string
}

export function AddProductInCart({ product, title }: Props) {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [quantity] = useState(1)

  const { notifySuccess } = useNotification()

  const handleAddToProductInCart = () => {
    const stockQuantity = product.stockQuantity

    addProductToCart({ ...product, quantity, stockQuantity })
    notifySuccess('Adicionado ao carrinho!')
  }

  return (
    <button
      onClick={() => handleAddToProductInCart()}
      className="max-w-56 flex w-full items-center justify-center gap-2 rounded-md bg-base_color_positive/60 p-1 duration-700 hover:bg-base_color_positive"
    >
      {title}
      <BaggageClaim size={28} />
    </button>
  )
}
