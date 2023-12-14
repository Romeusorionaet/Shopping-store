import { getDataProducts } from '@/lib/getData/get-data-products'
import Link from 'next/link'

import { LibraryBig, PackageX } from 'lucide-react'
import { CarouselProducts } from '@/components/carousel-products'
import { Category, OrderStatus, Product } from '@prisma/client'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SearchProduct } from '@/components/search-product'
import { OfferBanner } from '@/components/offer-banner'
import { OrderIncludeOrderProducts } from './orders/page'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'

export interface ProductsWithCategory extends Product {
  category: Category
}

export default async function Home() {
  const { props } = await getDataProducts()
  const products: ProductsWithCategory[] = JSON.parse(props.products)

  if (products.length === 0) {
    return <NoProductRegistrationMessage />
  }

  const productsInOffers = products
    .filter((product) => product.discountPercentage >= 50)
    .sort(() => Math.random() - 0.5)

  const filteredProductsWithDiscount = products
    .filter((product) => product.discountPercentage !== 0)
    .sort(() => Math.random() - 0.5)

  const allProducts = products.sort(() => Math.random() - 0.5)

  const session = await getServerSession(authOptions)

  const { props: propsOrders } = await getDataOrders(session?.user.id)
  const orders: OrderIncludeOrderProducts[] = JSON.parse(propsOrders.orders)

  const ordersNotPaymentList = orders
    .filter((order) => {
      return order.status === OrderStatus.WAITING_FOR_PAYMENT
    })
    .flatMap((ordersProducts) =>
      ordersProducts.orderProducts.map((orderProduct) => orderProduct.product),
    )
    .sort(() => Math.random() - 0.5)

  return (
    <main className="flex flex-col gap-6 overflow-hidden pb-8 max-w-[1480px] mx-auto">
      <div className="relative max-w-[1480px] w-full mx-auto">
        <div className="bg-gradient-to-r from-base_reference_card/40 h-full w-40 max-2xl:w-28 max-sm:w-10 absolute left-0 top-0 z-10" />
        <OfferBanner />
        <div className="bg-gradient-to-l from-base_reference_card/40 h-full w-40 max-2xl:w-28 max-sm:w-10 absolute right-0 top-0 z-10" />
      </div>

      <div>
        <p className="text-center mb-4">
          Acesse o nosso catálogo para ver todos os produtos da loja!
        </p>
        <div className="p-2 hover:bg-base_one_reference_header duration-700 flex justify-center items-center gap-2 border border-base_color_dark/10 w-52 mx-auto rounded-md">
          <Link className="font-bold" href="/catalog">
            Ver Nosso Catálogo
          </Link>
          <LibraryBig size={16} />
        </div>
      </div>

      <div className="px-2">
        <h2 className="my-4 text-lg">Todos os produtos</h2>

        <SearchProduct products={allProducts} />
      </div>

      <div className="px-2">
        {productsInOffers.length !== 0 && (
          <>
            <h2 className="my-4 text-lg">Super promoção</h2>

            <CarouselProducts products={productsInOffers} />
          </>
        )}

        <div>
          {filteredProductsWithDiscount.length !== 0 && (
            <>
              <h2 className="my-4 text-lg">Produtos em Promoção</h2>

              <CarouselProducts products={filteredProductsWithDiscount} />
            </>
          )}
        </div>

        {ordersNotPaymentList.length !== 0 && (
          <>
            <h2 className="my-4 text-lg">Produtos que você se interessou</h2>

            <CarouselProducts products={ordersNotPaymentList} />
          </>
        )}
      </div>
    </main>
  )
}
