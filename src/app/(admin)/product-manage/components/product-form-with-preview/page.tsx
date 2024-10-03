import { ProductCardManage } from '@/app/(admin)/components/product-card-admin/product-card-manage'
import { TechnicalProductDetails } from '@/components/technical-product-details'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModeOfSale } from '@/core/@types/api-store'

export function ProductFormWithPreview() {
  const product = {
    corsList: ['red', 'blue'],
    title: 'Iphone',
    price: 1500,
    imgUrlList: [
      'data:image/jpeg;base64,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',
    ],
    discountPercentage: 15,
    stockQuantity: 5,
    placeOfSale: ModeOfSale.ONLINE_STORE,
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
    <section className="space-y-10">
      <form className="flex flex-col gap-4 space-y-10">
        <div className="flex flex-wrap gap-4">
          <label className="space-y-2">
            <span>Imagem</span>
            <Input type="file" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Nome</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Valor base</span>
            <Input type="number" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Desconto %</span>
            <Input type="number" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Quantidade</span>
            <Input type="number" className="bg-transparent" />
          </label>
        </div>

        <label className="flex flex-col space-y-2">
          <span>Descrição</span>
          <textarea
            className="h-44 max-w-[500px] resize-none rounded-lg bg-slate-200 p-2"
            placeholder="descreva o produto..."
          ></textarea>
        </label>

        <div className="flex flex-wrap gap-4">
          <label className="space-y-2">
            <span>Marca</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Modelo</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>RAM</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>ROM</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Processador</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Tela</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Largura</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Altura</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Peso</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Resolução de captura de vídeo</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Resolução de vídeo</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Tempo médio da bateria</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Capacidade da bateria</span>
            <Input type="text" className="bg-transparent" />
          </label>
          <label className="space-y-2">
            <span>Sistema operacional</span>
            <Input type="text" className="bg-transparent" />
          </label>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="flex flex-col space-y-2">
            <span>Categoria do produto</span>
            <select className="w-28 rounded-lg bg-base_color_dark/80 p-1 text-base_color_text_top">
              <option value={0}>Selecione</option>
              <option value={1}>Samsung</option>
              <option value={2}>Motorola</option>
            </select>
          </label>

          <label className="flex flex-col space-y-2">
            <span>Modalidade de venda</span>
            <select className="w-28 rounded-lg bg-base_color_dark/80 p-1 text-base_color_text_top">
              <option value={0}>Selecione</option>
              <option value={1}>Venda local</option>
              <option value={2}>Para todo o Brasil</option>
            </select>
          </label>
        </div>
      </form>

      <div className="space-y-10">
        <h2 className="text-lg font-medium">
          Visualização do produto a ser salvo
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <ProductCardManage product={product} />

          <TechnicalProductDetails
            technicalProductDetails={technicalProductDetails}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" type="submit" className="border">
          Registrar produto
        </Button>
      </div>
    </section>
  )
}
