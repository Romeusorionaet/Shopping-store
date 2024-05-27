interface Props {
  discountPercentage: number
  basePrice: number
}

export function CalculateValueProduct({
  discountPercentage,
  basePrice,
}: Props) {
  const totalDiscount = Number(basePrice) * (discountPercentage / 100)
  const totalPrice = Number(basePrice) - totalDiscount

  return { totalPrice }
}
