import { ProductCardManage } from '@/app/(admin)/components/product-card-admin/product-card-manage'
import { TechnicalProductDetails } from '@/components/technical-product-details'
import { ModeOfSale } from '@/core/@types/api-store'
import { ProductManageHeader } from '../../components/product-manage-header'
import { ButtonFormProduct } from '../../components/product-form/button-form-product'
import { ProductForm } from '../../components/product-form/form'

export default function update() {
  const product = {
    id: 'edded',
    categoryId: 'deded',
    categoryTitle: 'Motorola',
    corsList: ['vermelho', 'azul'],
    title: 'Xiaomi redmi note 7 pro',
    slug: 'xiaomi-redmi-note-7-pro',
    price: 1500,
    imgUrlList: [
      'data:image/jpeg;base64,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',
    ],
    discountPercentage: 15,
    stockQuantity: 5,
    placeOfSale: ModeOfSale.ONLINE_STORE,
    description: 'lorem ipsum dolor sit amet',
    minimumQuantityStock: 5,
    stars: 54,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const technicalProductDetails = {
    id: 'bhiubi',
    productId: 'ijuhiuiun',
    width: '7,44 cm',
    height: '16,00 cm',
    weight: '166,00 g',
    brand: 'Motorola',
    model: 'Mootrola Moto G84',
    ram: '4 GB',
    rom: '64 GB',
    videoResolution: '8 Pixels',
    batteryCapacity: '5000 Milliamp Hours',
    screenOrWatchFace: 'LCD',
    averageBatteryLife: '22,5 Horas',
    videoCaptureResolution: '1084p',
    processorBrand: 'Snapdragon 695 (2,2 GHz Octa-Core)',
    operatingSystem: 'Android',
  }

  return (
    <main className="ml-12 w-full px-1 pt-44">
      <ProductManageHeader />

      <section className="my-10 mt-28 px-1">
        <h2 className="text-lg font-medium">
          Atualizar produto: <span className="font-light">{product.slug}</span>
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
              Visualização do produto a ser atualizado
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <ProductCardManage product={product} />

              <TechnicalProductDetails
                technicalProductDetails={technicalProductDetails}
              />
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
