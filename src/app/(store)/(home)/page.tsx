import { getDataProducts } from '@/lib/getData/get-data-products'
import Link from 'next/link'

import { LibraryBig } from 'lucide-react'
import { SearchProduct } from '@/components/search-product'
import { OfferBanner } from '@/components/offer-banner'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import posthog from 'posthog-js'
import { OrderProductProps, ProductProps } from '@/core/@types/api-store'
import { getDataBuyerOrderProducts } from '@/lib/getData/get-data-buyer-order-products'
import { CarouselProducts } from '@/components/carousel-products'
import { CarouselOrderProducts } from '@/components/carousel-products/order-products'

export default async function Home() {
  const { props } = await getDataProducts()
  const products: ProductProps[] = JSON.parse(props.products)

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

  const { props: propsOrderProducts } = await getDataBuyerOrderProducts()

  const orderProducts: OrderProductProps[] = JSON.parse(
    propsOrderProducts.orderProducts,
  )

  const orderProductsNotPaymentList = orderProducts.sort(
    () => Math.random() - 0.5,
  )

  return (
    <main className="mx-auto flex max-w-[1480px] flex-col gap-4 overflow-hidden pb-8">
      <div className="relative mx-auto w-full max-w-[1480px]">
        <div className="absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-base_reference_card/40 max-2xl:w-28 max-sm:w-10" />
        <OfferBanner />
        <div className="absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-base_reference_card/40 max-2xl:w-28 max-sm:w-10" />
      </div>

      {/* {posthog.has_opted_in_capturing() ||
      posthog.has_opted_out_capturing() ? null : (
        <CookieConsentBanner />
      )} */}

      <div>
        <p className="mb-4 text-center">
          Acesse o nosso catálogo para ver todos os produtos da loja!
        </p>
        <div className="mx-auto flex w-52 items-center justify-center gap-2 rounded-md border border-base_color_dark/10 p-2 duration-700 hover:bg-base_reference_card">
          <Link className="font-bold" href="/catalog">
            Ver Nosso Catálogo
          </Link>
          <LibraryBig size={16} />
        </div>
      </div>

      <div className="bg-white p-2">
        <h2 className="my-4 text-lg">Todos os produtos</h2>

        <SearchProduct products={allProducts} />
      </div>

      <div>
        {productsInOffers.length !== 0 && (
          <div className="bg-white p-2">
            <h2 className="my-4 text-lg">Super promoção</h2>

            <CarouselProducts products={productsInOffers} />
          </div>
        )}
      </div>

      <div>
        {filteredProductsWithDiscount.length !== 0 && (
          <div className="bg-white p-2">
            <h2 className="my-4 text-lg">Produtos em Promoção</h2>

            <CarouselProducts products={filteredProductsWithDiscount} />
          </div>
        )}
      </div>

      <div>
        {orderProductsNotPaymentList.length !== 0 && (
          <div className="bg-white p-2">
            <h2 className="my-4 text-lg">Produtos que você se interessou</h2>
            <CarouselOrderProducts
              orderProducts={orderProductsNotPaymentList}
            />
          </div>
        )}
      </div>
    </main>
  )
}
