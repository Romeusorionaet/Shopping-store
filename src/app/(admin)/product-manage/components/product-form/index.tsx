'use client'

import { Input } from '@/components/ui/input'
import { listBaseColor } from '@/constants/list-base-color'
import {
  ProductProps,
  TechnicalProductDetailsProps,
} from '@/core/@types/api-store'

interface ProductFormProps {
  product?: ProductProps
  technicalProduct?: TechnicalProductDetailsProps
}

export function ProductForm({ product, technicalProduct }: ProductFormProps) {
  const categoryListName = ['Samsung', 'Motorola', 'Xiaomi']

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    console.log(`Categoria selecionada: ${selectedCategory}`)
  }

  return (
    <form className="flex flex-col gap-4 space-y-10">
      <div className="flex flex-wrap gap-4">
        <label className="space-y-2">
          <span>Imagem</span>
          <Input type="file" className="bg-transparent" />
        </label>
        <label className="flex flex-col">
          Categoria
          <select
            defaultValue={product?.categoryTitle || 0}
            onChange={(e) => handleCategoryChange(e)}
            className="rounded-lg bg-base_color_dark/80 p-1 text-base_color_text_top"
          >
            <option value={0}>Selecione</option>
            {categoryListName.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span>Nome</span>
          <Input
            type="text"
            defaultValue={product?.title}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Valor base</span>
          <Input
            type="number"
            defaultValue={product?.price}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Desconto %</span>
          <Input
            type="number"
            defaultValue={product?.discountPercentage}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Quantidade</span>
          <Input
            type="number"
            defaultValue={product?.stockQuantity}
            className="bg-transparent"
          />
        </label>

        <label className="space-y-2">
          <span>Quantidade miníma em estoque</span>
          <Input
            type="number"
            defaultValue={product?.minimumQuantityStock}
            className="bg-transparent"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          {listBaseColor.map((cor, index: number) => {
            const isCheck = product?.corsList.some(
              (productCor) => productCor.toLowerCase() === cor.toLowerCase(),
            )

            return (
              <label key={index} className="flex items-center gap-1">
                <Input
                  type="checkbox"
                  defaultChecked={isCheck}
                  className="h-4 w-4"
                />
                {cor}
              </label>
            )
          })}
        </div>
      </div>

      <label className="flex flex-col space-y-2">
        <span>Descrição</span>
        <textarea
          placeholder="descreva o produto..."
          defaultValue={product?.description}
          className="h-44 max-w-[500px] resize-none rounded-lg bg-slate-200 p-2"
        ></textarea>
      </label>

      <div className="flex flex-wrap gap-4">
        <label className="space-y-2">
          <span>Marca</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.brand}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Modelo</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.model}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>RAM</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.ram}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>ROM</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.rom}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Processador</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.processorBrand}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Tela</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.screenOrWatchFace}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Largura</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.width}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Altura</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.height}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Peso</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.weight}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Resolução de captura de vídeo</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.videoCaptureResolution}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Resolução de vídeo</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.videoResolution}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Tempo médio da bateria</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.averageBatteryLife}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Capacidade da bateria</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.batteryCapacity}
            className="bg-transparent"
          />
        </label>
        <label className="space-y-2">
          <span>Sistema operacional</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.operatingSystem}
            className="bg-transparent"
          />
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
  )
}
