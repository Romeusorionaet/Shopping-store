'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/providers/zustand-store'
import { useState } from 'react'

export function AddProductInCart({ product }: any) {
  const [quantity] = useState(1)
  const { addProductToCart } = useCartStore()

  const handleAddToProductInCart = (product: any) => {
    addProductToCart({ ...product, quantity })
  }

  return (
    <Button
      onClick={() => handleAddToProductInCart(product)}
      className="bg-green-500 p-2 rounded-md sm:w-56"
    >
      Adicionar no carrinho
    </Button>
  )
}
