import { CarouselProducts } from '@/components/carousel-products'
import { getDataProducts } from '@/lib/getData/get-data-products'
import { Product } from '@prisma/client'
import { Flame } from 'lucide-react'

export default async function Offers() {
  const { props } = await getDataProducts()
  const products: Product[] = JSON.parse(props.products)

  const productsInOffers = products
    .filter((product) => product.discountPercentage >= 10)
    .sort(() => Math.random() - 0.5)

  return (
    <div className="pt-28 p-4 space-y-8">
      <div className="flex items-center gap-4">
        <h1>Super Ofertas </h1>
        <Flame className="text-amber-500" size={26} />
      </div>

      <CarouselProducts products={productsInOffers} />
    </div>
  )
}
