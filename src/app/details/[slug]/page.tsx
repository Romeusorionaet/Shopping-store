import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { AddProductInCart } from '../components/add-product-in-cart'
import { ProductList } from '../components/product-list'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Details({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataUniqueProduct(slug)

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-col flex-wrap gap-8 items-center justify-center my-8">
        {props?.product && (
          <div key={props.product.id}>
            <p className="block bg-red-600">{props.product.name}</p>
            <img className="w-20" src={props.product.imageUrls[0]} alt="" />
            <div className="flex">
              {props.product.imageUrls.map((imageUrl) => {
                return (
                  <img key={imageUrl} className="w-10" src={imageUrl} alt="" />
                )
              })}
            </div>
          </div>
        )}

        <AddProductInCart product={props?.product} />
      </div>

      <div>
        <h2>Lista do footer com items da mesma categoria sem o item autal</h2>

        <ProductList products={props?.product.category.products} />
      </div>
    </div>
  )
}
