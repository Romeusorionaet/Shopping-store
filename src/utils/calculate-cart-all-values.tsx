import { CartProduct } from '@/providers/zustand-store'

export function calculateCartAllValues(cart: CartProduct[]) {
  let subtotal = 0
  let totalDiscount = 0
  let total = 0

  cart.forEach((item) => {
    const currentTotalDiscount =
      Number(item.basePrice) * (item.discountPercentage / 100) * item.quantity
    const currentTotalPrice =
      Number(item.basePrice) * item.quantity - currentTotalDiscount
    subtotal += Number(item.basePrice) * item.quantity
    totalDiscount += currentTotalDiscount
    total += currentTotalPrice
  })

  return { subtotal, totalDiscount, total }
}
