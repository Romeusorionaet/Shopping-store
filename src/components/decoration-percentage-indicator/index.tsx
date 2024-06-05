import { categorizeDiscount } from '@/utils/categorize-discount'
import { Flame } from 'lucide-react'

interface Props {
  discountPercentage: number
}

export function DecorationPercentageIndicator({ discountPercentage }: Props) {
  const { styleDiscountPercentage } = categorizeDiscount({
    discountPercentage,
  })

  return (
    <>
      <Flame className={`${styleDiscountPercentage} rounded-full`} />
    </>
  )
}
