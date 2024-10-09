import { ProductCardManage } from '@/app/(admin)/components/product-card-admin/product-card-manage'
import { TechnicalProductDetails } from '@/components/technical-product-details'
import { ModeOfSale } from '@/core/@types/api-store'
import { ProductManageHeader } from '../../components/product-manage-header'
import { ButtonFormProduct } from '../../components/product-form/button-form-product'
import { ProductForm } from '../../components/product-form/form'

interface Props {
  params: { id: string }
}

export default function update({ params }: Props) {
  const { id } = params

  const product = {
    id: 'edded',
    categoryId: 'deded',
    categoryTitle: 'Motorola',
    corsList: ['vermelho', 'azul'],
    title: 'Xiaomi redmi note 7 pro',
    slug: 'xiaomi-redmi-note-7-pro',
    price: 1500,
    imgUrlList: [
      'b99a5fc3-e27e-4922-ae00-b065b87b610c-wdoqbj.png',
      'b422783e-959f-4a58-a48a-7f53577568e4-by4o8r.png',
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
    </div>
  )
}
