import { Product } from '@prisma/client'

export function CalculateValueProduct(product: Product) {
  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100)
  const totalPrice = Number(product.basePrice) - totalDiscount

  return { totalPrice }
}
