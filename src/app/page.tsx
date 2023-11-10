import { DiscountedProducts } from '@/components/discounted-products'
import { getDataProducts } from '@/lib/getData/get-data-products'
import Link from 'next/link'

import { LibraryBig } from 'lucide-react'
import { OfferBanner } from '@/components/offer-banner'

export default async function Home() {
  const { props } = await getDataProducts()

  const filteredProductsWithDiscount = props.products.filter(
    (product) => product.discountPercentage !== 0,
  )

  return (
    <div className="flex flex-col gap-6 h-screen">
      <OfferBanner />

      <div className="p-2 hover:bg-amber-200 duration-700 flex justify-center items-center gap-2 border border-zinc-400 w-52 mx-auto rounded-md">
        <Link className="font-bold" href="/catalog">
          Ver Nosso Catálogo
        </Link>
        <LibraryBig size={16} />
      </div>

      <DiscountedProducts products={filteredProductsWithDiscount} />
    </div>
  )
}
