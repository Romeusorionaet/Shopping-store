'use client'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Product } from '@prisma/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from '@/components/form/form-error'
import { useState } from 'react'
import { updateProduct } from '@/actions/update/product'
import { useRouter } from 'next/navigation'
import { deleteProduct } from '@/actions/delete/product'
import { Trash } from 'lucide-react'
import { ProductImages } from '@/app/details/components/product-images'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/generate-components'

interface FormUpdateProps {
  product: Product
}

interface ImageDataProps {
  url: string
  name: string
}

const updateFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres.' })
    .transform(
      (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
    ),
  description: z.string().min(20, { message: 'No mínimo 20 caracteres.' }),
  basePrice: z.string().min(1, { message: 'Informe o valor do produto.' }),
  discountPercentage: z
    .string()
    .min(1, { message: 'Informe o valor do desconto.' }),
  quantity: z.string().nullable(),
  placeOfSale: z.string().nullable(),
})

type UpdateFormData = z.infer<typeof updateFormSchema>

export function FormUpdate({ product }: FormUpdateProps) {
  const [imageDataProduct, setImageDataProduct] = useState<ImageDataProps[]>([
    { name: '', url: '' },
  ])
  const fileUrlsArray: string[] = imageDataProduct.map(
    (imageData) => imageData.url,
  )

  const navigate = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema),
  })

  const handleUpdateProduct = async (data: UpdateFormData) => {
    const {
      basePrice,
      description,
      discountPercentage,
      name,
      quantity,
      placeOfSale,
    } = data
    const newImageUrls = imageDataProduct.map((item) => item.url)
    const newSlug = name.toLowerCase().replace(/ /g, '-')
    const salesLocationType =
      placeOfSale === 'Sim' ? 'ONLINE_STORE' : 'SELL_IN_REGION_ONLY'

    const updatedData = {
      id: product.id,
      name,
      slug: newSlug,
      basePrice,
      description,
      discountPercentage,
      imageUrls: newImageUrls.length > 1 ? newImageUrls : product.imageUrls,
      quantity: Number(quantity) === 0 ? 1 : Number(quantity),
      placeOfSale: salesLocationType,
    }

    try {
      const result = await updateProduct({ updatedData })
      navigate.push('/control-adm')
      alert(result.message)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(product.id)
      navigate.push('/control-adm')
      alert(result.message)
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(product)

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col items-center justify-center gap-8">
        {imageDataProduct[0].url ? (
          <ProductImages
            imageUrls={fileUrlsArray}
            name={imageDataProduct[0].name}
          />
        ) : (
          <ProductImages imageUrls={product.imageUrls} name={product.name} />
        )}

        <UploadButton
          endpoint="imageShoppingStore"
          onClientUploadComplete={(res) => {
            res && setImageDataProduct(res)
            alert('Imagens da categoria salva no banco Uploadthing!')
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`)
          }}
        />
      </div>

      <form onSubmit={handleSubmit(handleUpdateProduct)}>
        <div className="flex flex-col gap-4" key={product.id}>
          <label className="flex flex-col gap-2">
            Nome
            <Input defaultValue={product.name} {...register('name')} />
            <FormError errors={errors.name?.message} />
          </label>

          <div>
            <label className="flex flex-col gap-2">
              Preço base
              <Input
                defaultValue={Number(product.basePrice)}
                {...register('basePrice')}
              />
              <FormError errors={errors.basePrice?.message} />
            </label>

            <label className="flex flex-col gap-2">
              Disconto
              <Input
                defaultValue={product.discountPercentage}
                {...register('discountPercentage')}
              />
              <FormError errors={errors.discountPercentage?.message} />
            </label>

            <label className="flex flex-col gap-2">
              <span>Quantidade</span>

              <p className="text-xs opacity-90">
                Opcional, valor padrão será 1
              </p>

              <Input
                defaultValue={product.quantity}
                {...register('quantity')}
              />
            </label>

            <label className="flex flex-col gap-2 mt-2">
              <span>Faz entrega deste produto para todo Brasil?</span>

              <p className="text-xs opacity-90">Valor padrão: {'Sim'}</p>

              <select
                className="p-2 rounded-md appearance-none border border-zinc-200 text-white bg-black"
                {...register('placeOfSale')}
              >
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 mt-4">
              Descrição
              <textarea
                className="bg-zinc-800 w-full h-40 resize-none p-2 rounded-md scrollbar"
                defaultValue={product.description}
                {...register('description')}
              ></textarea>
              <FormError errors={errors.description?.message} />
            </label>
          </div>
        </div>

        <div className="flex justify-between my-4">
          <Button
            className="text-zinc-950"
            disabled={isSubmitting}
            type="submit"
          >
            Atualizar
          </Button>

          <Button
            variant={'destructive'}
            type="button"
            onClick={handleDeleteProduct}
          >
            <Trash size={28} />
          </Button>
        </div>
      </form>
    </div>
  )
}
