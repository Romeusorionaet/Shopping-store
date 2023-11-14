import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { AddProductInCart } from '../components/add-product-in-cart'
import { ProductImages } from '../components/product-images'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { CarouselProducts } from '@/components/carousel-products'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Details({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataUniqueProduct(slug)
  const product = props?.product

  if (!product) {
    return null
  }

  const { totalPrice } = CalculateValueProduct(product)
  const totalPriceDividedByTwelve = totalPrice / 12

  return (
    <div className="h-screen flex flex-col justify-between pt-[4.5rem]">
      <div className="flex max-md:flex-col gap-8 justify-center items-center md:items-start my-8">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />

        <div className="flex flex-col gap-4 2xl:w-[50%] p-4">
          <h1 className="font-bold">{product.name}</h1>
          <div>
            {product.discountPercentage !== 0 && (
              <div className="flex gap-8">
                <p className="line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
                <p className="text-green-500 text-lg font-bold">
                  {product.discountPercentage}%{' '}
                  <span className="uppercase">off</span>
                </p>
              </div>
            )}
            <div>
              <p className="text-xl">R$ {totalPrice}</p>
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

          {product.placeOfSale !== 'onlineStore' ? (
            <p>
              Não fazemos a entrega deste produto. Retirar na loja Shopping
              Store
            </p>
          ) : (
            <AddProductInCart product={props?.product} />
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
