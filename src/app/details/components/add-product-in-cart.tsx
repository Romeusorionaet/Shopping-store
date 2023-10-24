'use client'

import { useCartStore } from '@/providers/zustand-store'
import { useState } from 'react'

export function AddProductInCart({ product }: any) {
  const [quantity] = useState(1)
  // const { addProductToCart } = useContext(CartContext)
  const { addProductToCart } = useCartStore()

  const handleAddToProductInCart = (product: any) => {
    addProductToCart({ ...product, quantity })
  }

  return (
    <button
      onClick={() => handleAddToProductInCart(product)}
      className="bg-green-500 p-2"
    >
      Adicionar no carrinho
    </button>
  )
}
