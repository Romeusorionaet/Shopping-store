import Link from 'next/link'
import { LibraryBig } from 'lucide-react'
import { OfferBanner } from '@/components/offer-banner'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'
import Image from 'next/image'
import smartphonePropaganda from '@/assets/img/banner-decoration/poco-smartphone.png'
import { Button } from '@/components/ui/button'
import bannerIphoneXsMax from '@/assets/img/banner-decoration/banner-iphone-xs-max.png'
import bannerIphoneLogo from '@/assets/img/banner-decoration/iPhone-logo.png'
import cart from '@/assets/img/banner-decoration/cart.png'
import { SectionBrandLogo } from '@/components/section-brand-logo'
import { DialogInformation } from '@/components/dialog-information'
import { getDataBuyerOrderProducts } from '@/actions/get/buyer/get-data-buyer-order-products'
import { getDataSearchProducts } from '@/actions/get/product/get-data-search-products'
import { SectionProductName } from '@/constants/section-product-name'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { SectionAllProducts } from './components/section-all-products'
import { SectionPromotion } from './components/section-promotion'
import { SectionPopular } from './components/section-popular'
import { SectionOrders } from './components/section-orders'

export default async function Home() {
  // All Product
  const { props: allProducts } = await getDataProducts({ page: 1 })

  if (allProducts.products.length === 0) {
    return <NoProductRegistrationMessage />
  }

  // Promotion products
  const { props: propsProductPromotionFiltered } = await getDataSearchProducts({
    section: SectionProductName.DISCOUNT_PERCENTAGE,
  })

  // Popular products
  const { props: propsProductPopularFiltered } = await getDataSearchProducts({
    section: SectionProductName.STARS,
  })

  // Order Products
  const { props: propsOrderProducts } = await getDataBuyerOrderProducts()

  return (
    <div>
      <OfferBanner />

      <DialogInformation />

      <main className="mx-auto flex max-w-[1480px] flex-col gap-4 overflow-hidden pb-20">
        <div className="relative rounded-md bg-base_one_reference_header/80">
          <div className="my-10 ml-4 flex h-52 flex-col justify-center md:ml-20">
            <div className="relative z-10 flex flex-col gap-8 text-base_color_text_top">
              <p className="font-roboto text-xl font-extrabold md:text-3xl">
                Acesse o nosso catálogo para ver todos{' '}
                <br className="max-md:hidden" /> os produtos da loja!
              </p>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex w-44 items-center justify-center gap-2 rounded-md border border-base_color_text_top p-2 hover:bg-base_reference_card hover:text-base_color_dark">
                  <Link className="font-bold" href="/catalog">
                    Ver Catálogo
                  </Link>
                  <LibraryBig size={16} />
                </div>
                <Button
                  variant="ghost"
                  className="w-40 hover:bg-base_color_text_top hover:text-base_color_dark"
                >
                  Entre em contato
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 rounded-full bg-gradient-to-t from-transparent to-cyan-100 md:right-10 md:w-52">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="h-36 w-44 object-cover md:h-52"
              src={smartphonePropaganda}
              alt={'smartphone poco blue color, propaganda'}
            />
          </div>
        </div>

        <SectionAllProducts products={allProducts.products} />

        <div className="flex rounded-md bg-base_one_reference_header/80 pr-2 text-base_color_text_top">
          <div className="flex h-56 w-1/2 justify-end">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="h-full object-cover"
              src={bannerIphoneXsMax}
              alt="banner Iphone Xs Max"
            />
          </div>

          <div className="relative flex w-1/2 flex-col items-center justify-center gap-2">
            <div className="h-20 w-20">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-full bg-white object-cover"
                src={bannerIphoneLogo}
                alt="banner Iphone Logo"
              />
            </div>

            <h3 className="font-bold">Iphone XS Max</h3>

            <p className="text-justify text-xs md:text-center">
              O iPhone XS Max tem tela Super Retina de 6,5 polegadas* em OLED
              exclusivo para HDR e brilho impressionante.{' '}
              <br className="max-md:hidden" /> Face ID avançado que permite
              desbloquear o aparelho
            </p>
          </div>
        </div>

        <SectionPromotion products={propsProductPromotionFiltered.products} />

        <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-base_one_reference_header/80 py-2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="h-40 w-40 rounded-full object-cover"
            src={cart}
            alt="banner Iphone Xs Max"
          />
          <p className="text-xl font-bold text-base_color_text_top md:text-2xl">
            Frete gratis para todo o Brasil!
          </p>
        </div>

        <SectionPopular products={propsProductPopularFiltered.products} />

        <SectionBrandLogo />

        <SectionOrders products={propsOrderProducts.orderProducts} />
      </main>
    </div>
  )
}
