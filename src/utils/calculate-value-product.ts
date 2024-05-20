import { ProductProps } from '@/core/@types/api-store'

export function CalculateValueProduct(product: ProductProps) {
  const totalDiscount =
    Number(product.price) * (product.discountPercentage / 100)
  const totalPrice = Number(product.price) - totalDiscount

  return { totalPrice }
}
