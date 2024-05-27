import Link from 'next/link'
import Image from 'next/image'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { AddProductInCart } from '@/components/add-product-in-cart'
import { ModeOfSale, ProductProps } from '@/core/@types/api-store'
import { fetchProductsTheSameCategory } from '@/lib/getData/fetch-products-the-same-category'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Category({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await fetchProductsTheSameCategory(slug)

  const products: ProductProps[] = JSON.parse(props.products)

  if (products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center p-2">
        <h1>Não há produtos registrado para esta categoria...</h1>
      </div>
    )
  }

  return (
    <div className="py-[8.5rem] text-center">
      <h1 className="text-2xl font-bold">{slug}</h1>

      <div className="my-8 flex flex-wrap justify-center gap-8">
        {products &&
          products.map((product) => {
            const { totalPrice } = CalculateValueProduct({
              discountPercentage: product.discountPercentage,
              basePrice: product.price,
            })

            const productAvailable = product.stockQuantity <= 0

            return (
              <div key={product.id}>
                <div className="group relative h-96 w-64">
                  <div
                    data-quantity={productAvailable}
                    className="absolute bottom-1 left-1 w-20 group-hover:flex data-[quantity=true]:hidden data-[quantity=true]:group-hover:hidden md:hidden"
                  >
                    <AddProductInCart product={product} />
                  </div>
                  <Link href={`/details/${product.slug}`}>
                    <div
                      data-quantity={productAvailable}
                      className="flex h-full flex-col items-center justify-center gap-2 rounded-md bg-base_reference_card/60 p-4 duration-700 hover:bg-base_reference_card_hover data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10"
                    >
                      <p className="text-sm">{product.title}</p>

                      <div>
                        <div>
                          {product.placeOfSale ===
                          ModeOfSale.SELLS_ONLY_IN_THE_REGION ? (
                            <span className="absolute bottom-28 left-0 rounded-tr-md bg-base_color_dark/5 p-1 text-xs font-bold">
                              Local
                            </span>
                          ) : (
                            <span className="absolute bottom-28 left-0 rounded-tr-md bg-base_color_dark/5 p-1 text-xs font-bold text-base_color_positive">
                              Brasil
                            </span>
                          )}
                        </div>

                        {product.discountPercentage !== 0 && (
                          <p className="text-xs line-through opacity-75">
                            {Number(product.price).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        )}

                        <p>
                          {totalPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-52 w-full object-contain"
                        src={product.imgUrlList[0]}
                        alt={product.title}
                      />

                      <div className="mb-4 flex w-full items-center justify-between gap-2">
                        {product.discountPercentage !== 0 && (
                          <p>
                            <strong>{product.discountPercentage}%</strong> Desc
                          </p>
                        )}

                        <p>
                          Qtd: <strong>{product.stockQuantity}</strong>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
