'use client'

import { useNotification } from '@/hooks/use-notifications'
import { useCartStore } from '@/providers/zustand-store'
import { Product } from '@prisma/client'
import { BaggageClaim } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface Props {
  product: Product
  title?: string
}

export function AddProductInCart({ product, title }: Props) {
  const { addProductToCart } = useCartStore()
  const [quantity] = useState(1)
  const session = useSession()

  const { notifyError, notifySuccess } = useNotification()

  const handleAddToProductInCart = () => {
    const user = session.data?.user

    if (!user) {
      notifyError('Faça login na sua conta.')
      return
    }

    const quantityInStock = product.quantity

    addProductToCart({ ...product, quantity, quantityInStock })
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
