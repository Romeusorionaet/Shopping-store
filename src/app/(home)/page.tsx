import { prismaClient } from '@/lib/prisma'
import Link from 'next/link'
import { DiscountedProducts } from './components/Categories/discounted-products'

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

export const getDataProducts = async () => {
  // get only products that be discounted
  // discounted are products where discount ir more that 0
  const products = await prismaClient.product.findMany({})

  if (!products) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
