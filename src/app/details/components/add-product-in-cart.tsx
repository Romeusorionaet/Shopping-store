'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/providers/zustand-store'
import { Product } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface Props {
  product: Product
}

export function AddProductInCart({ product }: Props) {
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
    <Button onClick={() => handleAddToProductInCart()} className="sm:w-56">
      Adicionar no carrinho
    </Button>
  )
}
