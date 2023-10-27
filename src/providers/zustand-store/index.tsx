import { Product } from '@prisma/client'
import { create } from 'zustand'

export interface CartProduct extends Product {
  totalPrice: number
  quantity: number
}

export interface CartStore {
  cart: CartProduct[]
  addProductToCart: (item: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

const getInitialCartState = () => {
  if (typeof window !== 'undefined') {
    const cartSavedInLocalStorage = JSON.parse(
      localStorage.getItem('@fsw-store/cart-products') || '[]',
    )

    return {
      cart: cartSavedInLocalStorage,
    }
  }

  return {
    cart: [],
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  ...getInitialCartState(),

  addProductToCart: (product) => {
    const { cart } = useCartStore.getState()

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id,
    )

    const totalDiscount =
      Number(product.basePrice) * (product.discountPercentage / 100)
    const totalPrice = Number(product.basePrice) - totalDiscount

    if (existingProductIndex !== -1) {
      const existingProduct = cart[existingProductIndex]
      const updatedCart = [...cart]
      const newQuantity = existingProduct.quantity + 1
      updatedCart[existingProductIndex] = {
        ...existingProduct,
        quantity: newQuantity,
        totalPrice: totalPrice * newQuantity,
      }
      set({ cart: updatedCart })
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1, totalPrice }],
      })
    }

    const updatedCartInLocalStorage = JSON.stringify(
      useCartStore.getState().cart,
    )
    localStorage.setItem('@fsw-store/cart-products', updatedCartInLocalStorage)
  },

  decreaseProductQuantity: (productId) => {
    const { cart } = get()

    const existingProductIndex = cart.findIndex((item) => item.id === productId)

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart]
      const existingProduct = cart[existingProductIndex]

      if (existingProduct.quantity > 1) {
        const totalDiscount =
          Number(existingProduct.basePrice) *
          (existingProduct.discountPercentage / 100)
        const totalPrice = Number(existingProduct.basePrice) - totalDiscount

        const newQuantity = existingProduct.quantity - 1

        updatedCart[existingProductIndex] = {
          ...existingProduct,
          quantity: newQuantity,
          totalPrice: totalPrice * newQuantity,
        }

        set({ cart: updatedCart })

        const updatedCartInLocalStorage = JSON.stringify(get().cart)
        localStorage.setItem(
          '@fsw-store/cart-products',
          updatedCartInLocalStorage,
        )
      }
    }
  },

  increaseProductQuantity: (productId) => {
    const { cart } = get()

    const existingProductIndex = cart.findIndex((item) => item.id === productId)

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart]
      const existingProduct = cart[existingProductIndex]

      const totalDiscount =
        Number(existingProduct.basePrice) *
        (existingProduct.discountPercentage / 100)
      const totalPrice = Number(existingProduct.basePrice) - totalDiscount

      const newQuantity = existingProduct.quantity + 1

      updatedCart[existingProductIndex] = {
        ...existingProduct,
        quantity: newQuantity,
        totalPrice: totalPrice * newQuantity,
      }

      set({ cart: updatedCart })

      const updatedCartInLocalStorage = JSON.stringify(get().cart)
      localStorage.setItem(
        '@fsw-store/cart-products',
        updatedCartInLocalStorage,
      )
    }
  },

  removeProductFromCart: (productId: string) => {
    const { cart } = get()

    const updatedCart = cart.filter(
      (cartProduct) => cartProduct.id !== productId,
    )

    set({ cart: updatedCart })

    const updatedCartInLocalStorage = JSON.stringify(get().cart)
    localStorage.setItem('@fsw-store/cart-products', updatedCartInLocalStorage)
  },
}))
