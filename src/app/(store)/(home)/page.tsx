import Link from 'next/link'
import { LibraryBig, Phone } from 'lucide-react'
import { OfferBanner } from '@/components/offer-banner'
import Image from 'next/image'
import smartphonePropaganda from '@/assets/img/banner-decoration/poco-smartphone.png'
import bannerIphoneXsMax from '@/assets/img/banner-decoration/banner-iphone-xs-max.png'
import bannerIphoneLogo from '@/assets/img/banner-decoration/iPhone-logo.png'
import cart from '@/assets/img/banner-decoration/cart.png'
import { SectionBrandLogo } from '@/components/section-brand-logo'
import { DialogInformation } from '@/components/dialog-information'
import { SectionAllProducts } from './components/section-all-products'
import { SectionPromotion } from './components/section-promotion'
import { SectionPopular } from './components/section-popular'
import { SectionOrders } from './components/section-orders'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { Suspense } from 'react'
import { SearchForm } from '@/components/search-form'

export default async function Home() {
  const queryClient = new QueryClient()

  if (process.env.NEXT_ENV !== 'test') {
    await queryClient.prefetchQuery({
      queryKey: ['allProducts'],
      queryFn: () => getDataProducts({ page: 1 }),
      staleTime: 1000 * 60 * 30, // 30 minutes
    })
  }

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
                <Link
                  className="flex w-44 items-center justify-center gap-2 rounded-md border border-base_color_text_top p-2 font-bold hover:bg-base_reference_card hover:text-base_color_dark"
                  href="/catalog"
                >
                  Ver Catálogo
                  <LibraryBig size={16} />
                </Link>

                <a
                  href="https://api.whatsapp.com/send?phone=55084981127596"
                  target="_blank"
                  className="flex w-36 items-center gap-2 text-sm text-white outline-none duration-500 hover:text-blue-500 focus:rounded-sm focus:border-transparent focus:outline-blue-500 md:w-56"
                  rel="noreferrer"
                >
                  <Phone size={20} />
                  Entre em contato: <br className="md:hidden" /> 84 81127596
                </a>
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

        <div className="bg-white px-2 py-8">
          <Suspense fallback={null}>
            <SearchForm />
          </Suspense>

          <h2 className="my-4 uppercase md:text-lg">Todos os produtos</h2>

          <HydrationBoundary state={dehydrate(queryClient)}>
            <SectionAllProducts />
          </HydrationBoundary>
        </div>

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

        <SectionPromotion />

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

        <SectionPopular />

        <SectionBrandLogo />

        <SectionOrders />
      </main>
    </div>
  )
}
