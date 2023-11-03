import { DiscountedProducts } from '@/components/discounted-products'
import { getDataProducts } from '@/lib/getData/get-data-products'
import Link from 'next/link'

export default async function Home() {
  const { props } = await getDataProducts()

  return (
    <div>
      <div className="bg-red-700 w-2/4 h-[16rem]">
        <p>banner de promoção aqui</p>
      </div>

      <div className="my-20 bg-red-500">
        <Link href="/catalog">Ver Nosso Catálogo</Link>
      </div>

      <DiscountedProducts products={props?.products} />
    </div>
  )
}
