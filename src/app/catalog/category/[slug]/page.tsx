import { getDataCategory } from '@/lib/getData/get-data-category'
import Link from 'next/link'
import Image from 'next/image'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { AddProductInCart } from '@/components/add-product-in-cart'
import { Product } from '@prisma/client'

interface SelectedProducts {
  products: Product[]
}

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Category({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataCategory(slug)

  const selectedProducts: SelectedProducts = JSON.parse(props.selectedProducts)

  if (selectedProducts.products.length === 0) {
    return (
      <div className="flex h-screen justify-center items-center p-2">
        <h1>Não há produtos registrado para esta categoria...</h1>
      </div>
    )
  }

  return (
    <div className="py-[8.5rem] text-center">
      <h1 className="font-bold text-2xl">{slug}</h1>

      <div className="flex flex-wrap gap-8 justify-center my-8">
        {selectedProducts.products &&
          selectedProducts.products.map((product) => {
            const { totalPrice } = CalculateValueProduct(product)
            const productAvailable = product.quantity <= 0

            return (
              <div key={product.id}>
                <div className="group relative w-64 h-96">
                  <div
                    data-quantity={productAvailable}
                    className="data-[quantity=true]:group-hover:hidden data-[quantity=true]:hidden group-hover:flex md:hidden absolute bottom-1 left-1 w-20"
                  >
                    <AddProductInCart product={product} />
                  </div>
                  <Link href={`/details/${product.slug}`}>
                    <div
                      data-quantity={productAvailable}
                      className="p-4 bg-base_reference_card/60 hover:bg-base_reference_card_hover duration-700 flex flex-col justify-center items-center gap-2 rounded-md h-full data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10"
                    >
                      <p className="text-sm">{product.name}</p>

                      <div>
                        <div>
                          {product.placeOfSale === 'SELL_IN_REGION_ONLY' ? (
                            <span className="absolute bottom-28 left-0 bg-base_color_dark/5 p-1 rounded-tr-md font-bold text-xs">
                              Local
                            </span>
                          ) : (
                            <span className="absolute bottom-28 left-0 bg-base_color_dark/5 p-1 rounded-tr-md font-bold text-xs text-base_color_positive">
                              Brasil
                            </span>
                          )}
                        </div>

                        {product.discountPercentage !== 0 && (
                          <p className="text-xs line-through opacity-75">
                            {Number(product.basePrice).toLocaleString('pt-BR', {
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
                        className="w-full h-52 object-contain"
                        src={product.imageUrls[0]}
                        alt={product.name}
                      />

                      <div className="flex items-center justify-between gap-2 w-full mb-4">
                        {product.discountPercentage !== 0 && (
                          <p>
                            <strong>{product.discountPercentage}%</strong> Desc
                          </p>
                        )}

                        <p>
                          Qtd: <strong>{product.quantity}</strong>
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
