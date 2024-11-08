import {
  ProductProps,
  TechnicalProductDetailsProps,
} from '@/core/@types/api-store'
import { ProductManageHeader } from '../../components/product-manage-header'
import { ButtonFormProduct } from '../../components/product-form/button-form-product'
import { ProductForm } from '../../components/product-form/form'
import { getDataUniqueProduct } from '@/actions/get/product/get-data-unique-product'
import { ProductCardManage } from '@/app/(admin)/components/product-card-admin/product-card-manage'
import { ButtonDeleteProduct } from '../../components/button-delete-product'
import { ProductDetailsNotFoundError } from '../../components/product-details-not-found-error'

interface Props {
  params: { id: string }
}

export default async function update({ params }: Props) {
  const { id } = params

  const { props } = await getDataUniqueProduct(id)

  if (!props.product) {
    return <ProductDetailsNotFoundError id={id} />
  }

  const product: ProductProps = JSON.parse(props.product)
  const technicalProductDetails: TechnicalProductDetailsProps = JSON.parse(
    props.technicalProductDetails,
  )

  return (
    <div className="ml-12 w-full px-1 pt-32">
      <ProductManageHeader productId={id} />

      <main>
        <section className="my-10 mt-28 px-1">
          <h2 className="text-lg font-medium">
            Atualizar produto:{' '}
            <span className="font-light">{product.slug}</span>
          </h2>

          <section className="my-10">
            <ProductForm
              product={product}
              technicalProduct={technicalProductDetails}
            />
          </section>

          <section className="my-10 space-y-10">
            <div className="space-y-10">
              <h2 className="text-lg font-medium">
                Visualização base do produto a ser atualizado
              </h2>

              <ProductCardManage product={product} />
            </div>
          </section>

          <div className="flex justify-between md:justify-evenly">
            <ButtonFormProduct />
            <ButtonDeleteProduct productId={id} />
          </div>
        </section>
      </main>
    </div>
  )
}
