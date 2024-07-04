interface Props {
  discountPercentage: number
}

export function getDiscountStyleClass({ discountPercentage }: Props) {
  switch (true) {
    case discountPercentage === 0:
      return { styleDiscountPercentage: '' }
    case discountPercentage <= 10:
      return {
        styleDiscountPercentage:
          'text-orange-300 animate-pulse border-b border-red-400',
      }
    case discountPercentage <= 20:
      return {
        styleDiscountPercentage: 'text-orange-500 border-b-4 border-red-500',
      }
    case discountPercentage <= 40:
      return {
        styleDiscountPercentage:
          'text-red-500 bg-gradient-to-t from-red-500 via-transparent to-transparent border-b-4 border-red-500',
      }
    default:
      return {
        styleDiscountPercentage:
          'text-red-800 bg-gradient-to-t from-red-900 via-orange-500 to-transparent border-b-4 border-red-800',
      }
  }
}
