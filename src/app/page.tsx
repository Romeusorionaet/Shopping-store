import { getDataProducts } from '@/lib/getData/get-data-products'
import Link from 'next/link'

import { LibraryBig } from 'lucide-react'
import { OfferBanner } from '@/components/offer-banner'
import { CarouselProducts } from '@/components/carousel-products'

export default async function Home() {
  const { props } = await getDataProducts()

  const filteredProductsWithDiscount = props.products
    .filter((product) => product.discountPercentage !== 0)
    .sort(() => Math.random() - 0.5)

  const allProducts = props.products.sort(() => Math.random() - 0.5)

  return (
    <div className="flex flex-col gap-6 overflow-hidden pb-8 max-w-[1480px] mx-auto">
      <div className="relative max-w-[1480px] w-full mx-auto">
        <div className="bg-gradient-to-r from-amber-100/40 h-full w-40 max-2xl:w-28 max-sm:w-10 absolute left-0 top-0 z-10" />
        <OfferBanner />
        <div className="bg-gradient-to-l from-amber-100/40 h-full w-40 max-2xl:w-28 max-sm:w-10 absolute right-0 top-0 z-10" />
      </div>

      <div className="p-2 hover:bg-amber-200 duration-700 flex justify-center items-center gap-2 border border-zinc-400 w-52 mx-auto rounded-md">
        <Link className="font-bold" href="/catalog">
          Ver Nosso Catálogo
        </Link>
        <LibraryBig size={16} />
      </div>

      <div>
        <h2 className="my-4 text-lg">Produtos em Promoção</h2>

        <CarouselProducts products={filteredProductsWithDiscount} />
      </div>

      <div>
        <h2 className="my-4 text-lg">Todos os Produtos</h2>

        <CarouselProducts products={allProducts} />
      </div>
    </div>
  )
}
