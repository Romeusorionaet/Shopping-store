import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { ProductImages } from '../components/product-images'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { CarouselProducts } from '@/components/carousel-products'
import { AskForProductReturn } from '../components/Ask-for-product-return'
import { Category, Product } from '@prisma/client'
import { AddProductInCart } from '@/components/add-product-in-cart'

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
    <div className="flex h-screen flex-col justify-between pt-[4.5rem]">
      <div className="my-8 flex items-center justify-center gap-8 max-md:flex-col md:items-start">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />

        <div className="flex flex-col gap-4 p-4 2xl:w-[50%]">
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
        {product.category.products.length !== 0 && (
          <div className="space-y-6">
            <h2 className="text-lg uppercase md:text-2xl">Veja também</h2>

            <CarouselProducts products={product.category.products} />
          </div>
        )}
      </div>
    </div>
  )
}
