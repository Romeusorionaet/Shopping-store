import { TechnicalProductDetails } from '@/components/technical-product-details'
import { ProductCardManage } from '../../components/product-card-admin/product-card-manage'
import { ProductManageHeader } from '../components/product-manage-header'
import { ModeOfSale } from '@/core/@types/api-store'
import { ProductForm } from '../components/product-form/form'
import { ButtonFormProduct } from '../components/product-form/button-form-product'

export default function RegisterProduct() {
  const product = {
    id: '',
    categoryId: '',
    categoryTitle: '',
    corsList: [],
    title: '',
    slug: '',
    price: 0,
    imgUrlList: [],
    discountPercentage: 0,
    stockQuantity: 0,
    placeOfSale: ModeOfSale.ONLINE_STORE,
    description: '',
    minimumQuantityStock: 0,
    stars: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const technicalProductDetails = {
    id: '',
    productId: '',
    width: '',
    height: '',
    weight: '',
    brand: '',
    model: '',
    ram: '',
    rom: '',
    videoResolution: '',
    batteryCapacity: '',
    screenOrWatchFace: '',
    averageBatteryLife: '',
    videoCaptureResolution: '',
    processorBrand: '',
    operatingSystem: '',
  }

  return (
    <main className="ml-12 w-full pt-44">
      <ProductManageHeader />

      <section className="mt-28 px-1">
        <section className="flex h-full w-full justify-center gap-6 rounded-lg max-md:flex-wrap">
          <div className="h-[400px] w-full max-w-[600px] rounded-lg bg-blue-200">
            <p>Exibir outros dados</p>
          </div>
          <div className="h-[400px] w-full max-w-[600px] rounded-lg bg-pink-200">
            <p>Exibir outros dados</p>
          </div>
        </section>
      </section>

      <section className="my-10 px-1">
        <h2 className="text-lg font-medium">Registrar um novo produto</h2>

        <section className="my-10">
          <ProductForm />
        </section>

        <section className="my-10 space-y-10">
          <div className="space-y-10">
            {product.imgUrlList.length !== 0 ? (
              <h2 className="text-lg font-medium">
                Visualização do produto a ser salvo
              </h2>
            ) : (
              <></>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              {product.title && <ProductCardManage product={product} />}

              {technicalProductDetails.brand && (
                <TechnicalProductDetails
                  technicalProductDetails={technicalProductDetails}
                />
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-center">
          <ButtonFormProduct />
        </div>
      </section>
    </main>
  )
}
