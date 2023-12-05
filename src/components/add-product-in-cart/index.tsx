'use client'

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

  const handleAddToProductInCart = () => {
    const user = session.data?.user

    if (!user) {
      alert('Faça login na sua conta.')
      return
    }

    const quantityInStock = product.quantity

    addProductToCart({ ...product, quantity, quantityInStock })
  }

  return (
    <button
      onClick={() => handleAddToProductInCart()}
      className="p-1 bg-green-200 w-full max-w-56 rounded-md flex duration-700 hover:bg-green-500 justify-center items-center gap-2"
    >
      {title}
      <BaggageClaim size={28} />
    </button>
  )
}
