'use client'

import { KeyLocalStorage } from '@/constants/key-local-storage'
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
  const [addProductToCart] = useCartStore((state) => [state.addProductToCart])

  const [quantity] = useState(1)

  const { notifySuccess, notifyError } = useNotification()

  const handleAddToProductInCart = () => {
    const publicId = localStorage.getItem(KeyLocalStorage.PUBLIC_ID)

    if (!publicId) {
      notifyError({ message: 'Você precisa fazer login', origin: 'client' })
      return
    }

    const stockQuantity = product.stockQuantity

    addProductToCart({
      ...product,
      quantity,
      stockQuantity,
    })

    notifySuccess({ message: 'Adicionado ao carrinho!', origin: 'client' })
  }

  return (
    <button
      data-testid={product.id}
      onClick={() => handleAddToProductInCart()}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-base_color_positive/60 p-1 duration-700 hover:bg-base_color_positive"
    >
      {title}
      <BaggageClaim size={28} />
    </button>
  )
}
