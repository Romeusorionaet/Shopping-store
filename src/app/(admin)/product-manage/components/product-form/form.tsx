'use client'

import { FormError } from '@/components/form/form-error'
import { Input } from '@/components/ui/input'
import { listBaseColor } from '@/constants/list-base-color'
import {
  ModeOfSale,
  ProductProps,
  TechnicalProductDetailsProps,
} from '@/core/@types/api-store'
import { useNotification } from '@/hooks/use-notifications'
import { productCreateSchema } from '@/schemas/product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Asterisk } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UploadImages } from './upload-imagens'
import { useState } from 'react'
import { createProduct } from '@/actions/register/products'
import { updateProduct } from '@/actions/update/product'
import { getCatalogBasicData } from '@/actions/get/catalog/get-data-catalog-basic-data'

interface ProductFormProps {
  product?: ProductProps
  technicalProduct?: TechnicalProductDetailsProps
}

export type ProductFormData = z.infer<typeof productCreateSchema>

export function ProductForm({ product, technicalProduct }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productCreateSchema),
  })
  const { notifyError, notifySuccess } = useNotification()
  const [imagesProduct, setImagesProduct] = useState<string[]>(
    product?.imgUrlList || [],
  )
  const [category, setCategory] = useState({ id: '', title: '' })

  const pathname = usePathname()
  const router = useRouter()

  const isRegisterPath = pathname === '/product-manage/register-product'

  const { data, isLoading, error } = useQuery({
    queryKey: ['catalogBasicData'],
    queryFn: () => getCatalogBasicData(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

  const categories: { id: string; title: string }[] = data
    ? JSON.parse(data.props.categoriesBasicData)
    : []

  const handleProductForm = async (productData: ProductFormData) => {
    const hasValidImageCount = imagesProduct.length > 0

    if (!hasValidImageCount) {
      const message = 'O produto deve ter pelo menos 1 imagem.'

      return notifyError({
        message,
        origin: 'client',
      })
    }

    const data = {
      ...productData,
      id: product?.id || '',
      technicalProductId: technicalProduct?.id || '',
      imgUrlList: imagesProduct.map((img) => img),
      categoryId: category.id || product?.categoryId,
      categoryTitle: category.title || product?.categoryTitle,
    }

    const productAction = isRegisterPath ? createProduct : updateProduct

    const result = await productAction({ product: data })

    const notify = result.success ? notifySuccess : notifyError
    notify({ message: result.message, origin: 'server' })

    router.replace('/product-manage/product-listing')
  }

  return (
    <form
      id="product-form"
      onSubmit={handleSubmit(handleProductForm)}
      className="flex flex-col gap-4 space-y-10"
    >
      <div className="flex flex-wrap gap-4">
        <UploadImages
          imagesProduct={imagesProduct}
          setImagesProduct={setImagesProduct}
        />

        <label className="flex flex-col">
          <p
            data-value={error}
            className="flex gap-2 data-[value=true]:text-red-500"
          >
            Categoria
          </p>
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-800" />
          ) : (
            <select
              defaultValue={
                JSON.stringify({
                  id: product?.categoryId,
                  title: product?.categoryTitle,
                }) || ''
              }
              onChange={(e) => setCategory(JSON.parse(e.target.value))}
              className="rounded-lg bg-base_color_dark/80 p-1 text-base_color_text_top"
            >
              <option value="">Selecione</option>
              {categories.map((category) => (
                <option key={category.id} value={JSON.stringify(category)}>
                  {category.title}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="space-y-2">
          <span>Nome</span>
          <Input
            type="text"
            defaultValue={product?.title}
            className="bg-transparent"
            {...register('title')}
          />
          <FormError errors={errors.title?.message} />
        </label>
        <label className="space-y-2">
          <span>Valor base</span>
          <Input
            type="number"
            defaultValue={product?.price}
            className="bg-transparent"
            {...register('price')}
          />
          <FormError errors={errors.price?.message} />
        </label>
        <label className="space-y-2">
          <span>Desconto %</span>
          <Input
            type="number"
            defaultValue={product?.discountPercentage}
            className="w-20 bg-transparent"
            {...register('discountPercentage')}
          />
          <FormError errors={errors.discountPercentage?.message} />
        </label>
        <label className="space-y-2">
          <span>Quantidade</span>
          <Input
            type="number"
            defaultValue={product?.stockQuantity}
            className="w-20 bg-transparent"
            {...register('stockQuantity')}
          />
          <FormError errors={errors.stockQuantity?.message} />
        </label>

        <label className="space-y-2">
          <span>Quantidade miníma em estoque</span>
          <Input
            type="number"
            defaultValue={product?.minimumQuantityStock}
            className="w-20 bg-transparent"
            {...register('minimumQuantityStock')}
          />
          <FormError errors={errors.minimumQuantityStock?.message} />
        </label>

        <div className="mt-10 space-y-6">
          <p className="flex flex-col gap-2">
            Selecione a cor do produto (pode ser mais de uma cor)
            <span>
              {errors.corsList ? <Asterisk size={16} color="red" /> : ''}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {listBaseColor.map((cor) => {
              const isCheck = product?.corsList.some(
                (productCor) => productCor.toLowerCase() === cor.toLowerCase(),
              )

              return (
                <label key={cor} className="flex items-center gap-1">
                  <Input
                    type="checkbox"
                    defaultChecked={isCheck}
                    className="h-4 w-4"
                    {...register('corsList')}
                    value={cor}
                  />
                  {cor}
                </label>
              )
            })}
          </div>
        </div>
      </div>

      <label className="flex flex-col space-y-2">
        <span>Descrição</span>
        <textarea
          placeholder="descreva o produto..."
          defaultValue={product?.description}
          className="h-44 max-w-[500px] resize-none rounded-lg bg-slate-200 p-2"
          {...register('description')}
        ></textarea>
        <FormError errors={errors.description?.message} />
      </label>

      <div className="flex flex-wrap gap-4">
        <label className="space-y-2">
          <span>Marca</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.brand}
            className="bg-transparent"
            {...register('technicalProductDetails.brand')}
          />
          <FormError errors={errors.technicalProductDetails?.brand?.message} />
        </label>
        <label className="space-y-2">
          <span>Modelo</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.model}
            className="bg-transparent"
            {...register('technicalProductDetails.model')}
          />
          <FormError errors={errors.technicalProductDetails?.model?.message} />
        </label>
        <label className="space-y-2">
          <span>RAM</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.ram}
            className="bg-transparent"
            {...register('technicalProductDetails.ram')}
          />
          <FormError errors={errors.technicalProductDetails?.ram?.message} />
        </label>
        <label className="space-y-2">
          <span>ROM</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.rom}
            className="bg-transparent"
            {...register('technicalProductDetails.rom')}
          />
          <FormError errors={errors.technicalProductDetails?.rom?.message} />
        </label>
        <label className="space-y-2">
          <span>Processador</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.processorBrand}
            className="bg-transparent"
            {...register('technicalProductDetails.processorBrand')}
          />
          <FormError
            errors={errors.technicalProductDetails?.processorBrand?.message}
          />
        </label>
        <label className="space-y-2">
          <span>Tela</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.screenOrWatchFace}
            className="bg-transparent"
            {...register('technicalProductDetails.screenOrWatchFace')}
          />
          <FormError
            errors={errors.technicalProductDetails?.screenOrWatchFace?.message}
          />
        </label>
        <label className="space-y-2">
          <span>Largura</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.width}
            className="bg-transparent"
            {...register('technicalProductDetails.width')}
          />
          <FormError errors={errors.technicalProductDetails?.width?.message} />
        </label>
        <label className="space-y-2">
          <span>Altura</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.height}
            className="bg-transparent"
            {...register('technicalProductDetails.height')}
          />
          <FormError errors={errors.technicalProductDetails?.height?.message} />
        </label>
        <label className="space-y-2">
          <span>Peso</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.weight}
            className="bg-transparent"
            {...register('technicalProductDetails.weight')}
          />
          <FormError errors={errors.technicalProductDetails?.weight?.message} />
        </label>
        <label className="space-y-2">
          <span>Resolução de captura de vídeo</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.videoCaptureResolution}
            className="bg-transparent"
            {...register('technicalProductDetails.videoCaptureResolution')}
          />
          <FormError
            errors={
              errors.technicalProductDetails?.videoCaptureResolution?.message
            }
          />
        </label>
        <label className="space-y-2">
          <span>Resolução de vídeo</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.videoResolution}
            className="bg-transparent"
            {...register('technicalProductDetails.videoResolution')}
          />
          <FormError
            errors={errors.technicalProductDetails?.videoResolution?.message}
          />
        </label>
        <label className="space-y-2">
          <span>Tempo médio da bateria</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.averageBatteryLife}
            className="bg-transparent"
            {...register('technicalProductDetails.averageBatteryLife')}
          />
          <FormError
            errors={errors.technicalProductDetails?.averageBatteryLife?.message}
          />
        </label>
        <label className="space-y-2">
          <span>Capacidade da bateria</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.batteryCapacity}
            className="bg-transparent"
            {...register('technicalProductDetails.batteryCapacity')}
          />
          <FormError
            errors={errors.technicalProductDetails?.batteryCapacity?.message}
          />
        </label>
        <label className="space-y-2">
          <span>Sistema operacional</span>
          <Input
            type="text"
            defaultValue={technicalProduct?.operatingSystem}
            className="bg-transparent"
            {...register('technicalProductDetails.operatingSystem')}
          />
          <FormError
            errors={errors.technicalProductDetails?.operatingSystem?.message}
          />
        </label>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="flex flex-col space-y-2">
          <p className="flex gap-2">
            Modalidade de venda
            <span>
              {errors.placeOfSale ? <Asterisk size={16} color="red" /> : ''}
            </span>
          </p>
          <select
            defaultValue={product?.placeOfSale || 0}
            className="w-28 rounded-lg bg-base_color_dark/80 p-1 text-base_color_text_top"
            {...register('placeOfSale')}
          >
            <option value="">Selecione</option>
            <option value={ModeOfSale.SELLS_ONLY_IN_THE_REGION}>
              Venda local
            </option>
            <option value={ModeOfSale.ONLINE_STORE}>Para todo o Brasil</option>
          </select>
        </label>
      </div>
    </form>
  )
}
