import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { CarouselProducts } from '@/components/carousel-products'
import { AddProductInCart } from '@/components/add-product-in-cart'
import { PackageX } from 'lucide-react'
import { Metadata } from 'next'
import { metadata } from '@/app/layout'
import { ModeOfSale, ProductProps } from '@/core/@types/api-store'
import { ProductImages } from '../../components/product-images'
import { AskForProductReturn } from '../../components/Ask-for-product-return'
import { getDataProductsTheSameCategory } from '@/lib/getData/get-data-products-the-same-category'

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

  const product: ProductProps = JSON.parse(props.product)

  const { props: dataProducts } = await getDataProductsTheSameCategory(
    product.categoryId,
  )

  const dataProductsTheSameCategory: ProductProps[] = JSON.parse(
    dataProducts.products,
  )

  const { totalPrice } = CalculateValueProduct({
    discountPercentage: product.discountPercentage,
    basePrice: product.price,
  })
  const totalPriceDividedByTwelve = totalPrice / 12

  const quantity = product.stockQuantity < 0 ? 0 : product.stockQuantity

  return (
    <div className="flex h-screen flex-col justify-between pt-[4.5rem]">
      <div className="my-8 flex items-center justify-center gap-8 max-md:flex-col md:items-start">
        <ProductImages imageUrls={product.imgUrlList} name={product.title} />

        <div className="flex flex-col gap-4 p-4 2xl:w-[50%]">
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
                <p className="text-lg font-bold text-base_color_positive">
                  {product.discountPercentage}%{' '}
                  <span className="uppercase">off</span>
                </p>
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
                em{' '}
                <span className="text-base_color_positive">
                  12x R$ {totalPriceDividedByTwelve.toFixed(2)} sem juros
                </span>
              </p>
            </div>
          </div>

          <p className="text-xl">Descrição:</p>
          <div className="scrollbar h-96 overflow-auto border border-base_color_dark/20 p-1">
            <pre className="whitespace-pre-wrap font-sans">
              {product.description}
            </pre>
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
                <AddProductInCart
                  title="Adicionar ao carrinho"
                  product={product}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8 p-4">
        {dataProductsTheSameCategory.length !== 0 && (
          <div className="space-y-6">
            <h2 className="text-lg uppercase md:text-2xl">Veja também</h2>

            <CarouselProducts products={dataProductsTheSameCategory} />
          </div>
        )}
      </div>
    </div>
  )
}
