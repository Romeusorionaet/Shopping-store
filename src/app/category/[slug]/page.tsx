import { getDataCategory } from '@/lib/getData/get-data-category'
import Link from 'next/link'
import Image from 'next/image'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Category({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataCategory(slug)

  return (
    <div className="pt-[8.5rem] text-center">
      <h1 className="font-bold text-2xl">{slug}</h1>

      <div className="flex flex-wrap gap-8 justify-center my-8">
        {props?.selectedProducts.products &&
          props.selectedProducts.products.map((product) => {
            const totalDiscount =
              Number(product.basePrice) * (product.discountPercentage / 100)
            const totalPrice = Number(product.basePrice) - totalDiscount
            return (
              <Link
                href={`/details/${product.slug}`}
                key={product.id}
                className="bg-amber-50/60 hover:bg-amber-100 duration-700 p-4 rounded-md relative w-60"
              >
                <span className="absolute bottom-28 left-0 bg-zinc-100/40 p-1 rounded-md font-bold">
                  {product.placeOfSale}
                </span>

                <p>{product.name}</p>
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-52 object-contain"
                  src={product.imageUrls[0]}
                  alt={product.name}
                />

                <div className="flex flex-col gap-1">
                  <div>
                    {product.discountPercentage !== 0 && (
                      <p className="text-xs line-through opacity-75">
                        R$ {Number(product.basePrice).toFixed(2)}
                      </p>
                    )}
                    <p>R$ {totalPrice}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2 w-full">
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
            )
          })}
      </div>
    </div>
  )
}
