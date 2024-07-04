import { getDiscountStyleClass } from '@/utils/get-discount-style-class'
import { Flame } from 'lucide-react'

interface Props {
  discountPercentage: number
}

export function DecorationPercentageIndicator({ discountPercentage }: Props) {
  const { styleDiscountPercentage } = getDiscountStyleClass({
    discountPercentage,
  })

  return (
    <>
      <Flame className={`${styleDiscountPercentage} rounded-full`} />
    </>
  )
}
