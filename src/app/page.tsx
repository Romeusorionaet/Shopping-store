import { getDataProducts } from '@/lib/getData/get-data-products'
import Link from 'next/link'

import { LibraryBig } from 'lucide-react'
import { OfferBanner } from '@/components/offer-banner'
import { CarouselProducts } from '@/components/carousel-products'
import { Product } from '@prisma/client'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { OrderIncludeOrderProducts } from './orders/page'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const { props } = await getDataProducts()
  const products: Product[] = JSON.parse(props.products)

  const productsInOffers = products
    .filter((product) => product.discountPercentage >= 50)
    .sort(() => Math.random() - 0.5)

  const filteredProductsWithDiscount = products
    .filter((product) => product.discountPercentage !== 0)
    .sort(() => Math.random() - 0.5)

  const allProducts = products.sort(() => Math.random() - 0.5)

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <h1>Sem usuário logado</h1>
  }

  const { props: propsOrders } = await getDataOrders(session.user.id)
  const orders: OrderIncludeOrderProducts[] = JSON.parse(propsOrders.orders)

  const productList = orders
    .filter((order) => order.status === 'WAITING_FOR_PAYMENT')
    .sort(() => Math.random() - 0.5)
    .flatMap((ordersProducts) =>
      ordersProducts.orderProducts.map((orderProduct) => orderProduct.product),
    )

  return (
    <main className="flex flex-col gap-6 overflow-hidden pb-8 max-w-[1480px] mx-auto">
      <div className="relative max-w-[1480px] w-full mx-auto">
        <div className="bg-gradient-to-r from-amber-100/40 h-full w-40 max-2xl:w-28 max-sm:w-10 absolute left-0 top-0 z-10" />
        <OfferBanner />
        <div className="bg-gradient-to-l from-amber-100/40 h-full w-40 max-2xl:w-28 max-sm:w-10 absolute right-0 top-0 z-10" />
      </div>

      <div>
        <p className="text-center mb-4">
          Acesse o nosso catálogo para ver todos os produtos da loja!
        </p>
        <div className="p-2 hover:bg-amber-200 duration-700 flex justify-center items-center gap-2 border border-zinc-400 w-52 mx-auto rounded-md">
          <Link className="font-bold" href="/catalog">
            Ver Nosso Catálogo
          </Link>
          <LibraryBig size={16} />
        </div>
      </div>

      <div className="px-2">
        {productsInOffers.length !== 0 && (
          <div>
            <h2 className="my-4 text-lg">Super promoção</h2>

            <CarouselProducts products={productsInOffers} />
          </div>
        )}

        <h2 className="my-4 text-lg">Produtos em Promoção</h2>

        <CarouselProducts products={filteredProductsWithDiscount} />

        <h2 className="my-4 text-lg">Produtos que você se interessou</h2>

        <CarouselProducts products={productList} />

        <h2 className="my-4 text-lg">Produtos variados</h2>

        <CarouselProducts products={allProducts} />
      </div>
    </main>
  )
}
