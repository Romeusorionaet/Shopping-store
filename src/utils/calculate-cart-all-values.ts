import { CartProduct } from '@/providers/zustand-store'

export function calculateCartAllValues(cart: CartProduct[]) {
  let subtotal = 0
  let totalDiscount = 0
  let total = 0

  cart.forEach((item) => {
    const currentTotalDiscount =
      Number(item.price) * (item.discountPercentage / 100) * item.quantity
    const currentTotalPrice =
      Number(item.price) * item.quantity - currentTotalDiscount
    subtotal += Number(item.price) * item.quantity
    totalDiscount += currentTotalDiscount
    total += currentTotalPrice
  })

  return { subtotal, totalDiscount, total }
}
