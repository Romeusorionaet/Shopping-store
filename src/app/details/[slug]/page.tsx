import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { AddProductInCart } from '../components/add-product-in-cart'
import { ProductImages } from '../components/product-images'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { CarouselProducts } from '@/components/carousel-products'
import { AskForProductReturn } from '../components/Ask-for-product-return'
import { Category, Product } from '@prisma/client'

interface CategoryIncludeProducts extends Category {
  products: Product[]
}

export interface ProductIncludeCategoryAndProducts extends Product {
  category: CategoryIncludeProducts
}

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Details({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataUniqueProduct(slug)
  const product: ProductIncludeCategoryAndProducts = JSON.parse(props.product)

  if (!product) {
    return <p>Produto não encontrado</p>
  }

  const { totalPrice } = CalculateValueProduct(product)
  const totalPriceDividedByTwelve = totalPrice / 12

  const quantity = product.quantity < 0 ? 0 : product.quantity

  return (
    <div className="h-screen flex flex-col justify-between pt-[4.5rem]">
      <div className="flex max-md:flex-col gap-8 justify-center items-center md:items-start my-8">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />

        <div className="flex flex-col gap-4 2xl:w-[50%] p-4">
          <h1 className="font-bold">{product.name}</h1>
          <p>
            Quantidade em estoque: <strong>{quantity}</strong>
          </p>
          <div>
            {product.discountPercentage !== 0 && (
              <div className="flex gap-8">
                <p className="line-through opacity-75">
                  {Number(product.basePrice).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-green-500 text-lg font-bold">
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
                <span className="text-green-500">
                  12x R$ {totalPriceDividedByTwelve.toFixed(2)} sem juros
                </span>
              </p>
            </div>
          </div>

          <p className="text-xl">Descrição:</p>
          <p>{product.description}</p>

          {product.quantity <= 0 ? (
            <div className="space-y-4">
              <p>
                Não temos mais este produto no momento. Por favor mande sua
                mensagem para o retorno do produto ao estoque.
              </p>
              <AskForProductReturn productName={product.name} />
            </div>
          ) : (
            <div>
              {product.placeOfSale !== 'ONLINE_STORE' ? (
                <p>
                  Não fazemos a entrega deste produto. Retirar na loja Shopping
                  Store
                </p>
              ) : (
                <AddProductInCart product={product} />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-8">
        <h2 className="text-lg md:text-2xl uppercase">Veja também</h2>

        <CarouselProducts products={product.category.products} />
      </div>
    </div>
  )
}
