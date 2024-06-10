import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { CarouselProducts } from '@/components/carousel-products'
import { AddProductInCart } from '@/components/add-product-in-cart'
import { PackageX } from 'lucide-react'
import { Metadata } from 'next'
import { metadata } from '@/app/layout'
import {
  ModeOfSale,
  ProductProps,
  TechnicalProductDetailsProps,
} from '@/core/@types/api-store'
import { ProductImages } from '../../components/product-images'
import { AskForProductReturn } from '../../components/Ask-for-product-return'
import { TechnicalProductDetails } from '../../components/technical-product-details'
import { PaymentAndPolices } from '@/components/rules-and-policies/payment-and-rules'
import { ReturnPolices } from '@/components/rules-and-policies/return-policies'
import { PaymentAndOptions } from '@/components/rules-and-policies/payment-options'
import { DecorationPercentageIndicator } from '@/components/decoration-percentage-indicator'
import { getDataProductsTheSameCategory } from '@/actions/get/product/get-data-products-the-same-category'
import { getDataUniqueProduct } from '@/actions/get/product/get-data-unique-product'

interface ParamsProps {
  params: {
    slug: string
    id: string
  }
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { slug } = params

  return {
    title: slug,
    openGraph: {
      siteName: metadata.openGraph?.siteName,
      url: `${metadata.openGraph?.url}/details/${slug}`,
      images: [
        {
          url: 'https://wallpaperaccess.com/full/1496239.jpg',
          width: 1000,
          height: 1000,
          alt: 'My custom alt',
        },
      ],
    },
  }
}

export default async function Details({ params }: ParamsProps) {
  const { id } = params
  const { props } = await getDataUniqueProduct(id)

  if (!props.product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <PackageX size={44} />
        <p>Produto não encontrado.</p>
      </div>
    )
  }

  if (!props.technicalProductDetails) {
    return
  }

  const product: ProductProps = JSON.parse(props.product)
  const technicalProductDetails: TechnicalProductDetailsProps = JSON.parse(
    props.technicalProductDetails,
  )

  const { props: dataProducts } = await getDataProductsTheSameCategory({
    categoryId: product.categoryId,
    page: 1,
  })

  const dataProductsTheSameCategory: ProductProps[] = JSON.parse(
    dataProducts.products,
  )

  const filteredProductsTheSameCategory = dataProductsTheSameCategory.filter(
    (product) => product.id !== id,
  )

  const { totalPrice } = CalculateValueProduct({
    discountPercentage: product.discountPercentage,
    basePrice: product.price,
  })
  const totalPriceDividedByTwelve = totalPrice / 10

  const quantity = product.stockQuantity < 0 ? 0 : product.stockQuantity

  return (
    <div className="flex h-screen flex-col justify-between pt-[4.5rem]">
      <div className="my-8 flex items-center justify-center gap-8 max-md:flex-col md:items-start">
        <ProductImages imageUrls={product.imgUrlList} name={product.title} />

        <div className="flex flex-col gap-4 p-4 md:border-l 2xl:w-[50%]">
          <h1 className="font-bold">{product.title}</h1>
          <p>
            Quantidade em estoque: <strong>{quantity}</strong>
          </p>

          <div>
            {product.discountPercentage !== 0 && (
              <div className="flex gap-8">
                <p className="line-through opacity-75">
                  {Number(product.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>

                <div className="rounded-md bg-base_one_reference_header p-1">
                  <p className="text-lg font-bold text-base_color_positive">
                    {product.discountPercentage}%{' '}
                    <span className="uppercase">off</span>
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="text-xl">
                {totalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                })}
              </p>
              <p>
                em até{' '}
                <span className="text-base_color_positive">
                  12x R$ {totalPriceDividedByTwelve.toFixed(2)} sem juros
                </span>
              </p>
            </div>

            <PaymentAndOptions totalPrice={totalPrice} />

            <div className="mt-4 flex items-center gap-2">
              <DecorationPercentageIndicator
                discountPercentage={product.discountPercentage}
              />
              <p className="text-xs">Temperatura</p>
            </div>

            <div className="mt-2">
              {product.stars > 0 && <p>Vendido: {product.stars}</p>}
            </div>

            <p className="mt-4 uppercase">Frete gratis para todo Brasil!</p>
          </div>

          <div className="mx-auto flex gap-2">
            <PaymentAndPolices />
            <ReturnPolices />
          </div>

          {product.stockQuantity <= 0 ? (
            <div className="space-y-4">
              <p>
                Não temos mais este produto no momento. Por favor mande sua
                mensagem para o retorno do produto ao estoque.
              </p>
              <AskForProductReturn productName={product.title} />
            </div>
          ) : (
            <div>
              {product.placeOfSale !== ModeOfSale.ONLINE_STORE ? (
                <p>
                  Não fazemos a entrega deste produto. Retirar na loja Shopping
                  Store
                </p>
              ) : (
                <div className="mx-auto w-60">
                  <AddProductInCart
                    title="Adicionar ao carrinho"
                    product={product}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="ml-2">
        <h2 className="mb-4 text-lg uppercase md:text-2xl">Descrição:</h2>

        <div className="border-b border-base_color_dark/20 p-1">
          <pre className="whitespace-pre-wrap font-roboto">
            {product.description}
          </pre>
        </div>
      </div>

      <TechnicalProductDetails
        technicalProductDetails={technicalProductDetails}
      />

      <div className="p-2 pb-28">
        {filteredProductsTheSameCategory.length !== 0 && (
          <div className="space-y-6">
            <h2 className="text-lg uppercase md:text-2xl">Veja também</h2>

            <CarouselProducts products={filteredProductsTheSameCategory} />
          </div>
        )}
      </div>
    </div>
  )
}
