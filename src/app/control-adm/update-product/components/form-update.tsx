'use client'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Product } from '@prisma/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from '@/components/form/form-error'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { useState } from 'react'
import { UploadButton } from '@uploadthing/react'
import { updateProduct } from '@/actions/update/product'
import { useRouter } from 'next/navigation'
import { deleteProduct } from '@/actions/delete/product'

interface FormUpdateProps {
  product: Product
}

interface ImageDataProps {
  fileUrl: string
  fileName: string
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
})

type UpdateFormData = z.infer<typeof updateFormSchema>

export function FormUpdate({ product }: FormUpdateProps) {
  const [imageDataProduct, setImageDataProduct] = useState<ImageDataProps[]>([
    { fileName: '', fileUrl: '' },
  ])

  const navigate = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema),
  })

  const handleUpdateProduct = async (data: UpdateFormData) => {
    const { basePrice, description, discountPercentage, name } = data
    const newImageUrls = imageDataProduct.map((item) => item.fileUrl)
    const newSlug = name.toLowerCase().replace(/ /g, '-')

    const updatedData = {
      id: product.id,
      name,
      slug: newSlug,
      basePrice,
      description,
      discountPercentage,
      imageUrls: newImageUrls.length > 1 ? newImageUrls : product.imageUrls,
    }

    try {
      console.log(updatedData)
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

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)}>
      <div className="flex flex-col gap-4" key={product.id}>
        <label>
          Nome
          <Input
            className="bg-zinc-300 text-zinc-950"
            defaultValue={product.name}
            {...register('name')}
          />
          <FormError errors={errors.name?.message} />
        </label>

        <div>
          <div>
            {imageDataProduct[0].fileUrl ? (
              <img
                className="w-20 h-20"
                src={imageDataProduct[0].fileUrl}
                alt={imageDataProduct[0].fileName}
              />
            ) : (
              <img
                className="w-20 h-20"
                src={product.imageUrls[0]}
                alt={product.name}
              />
            )}

            <div className="flex">
              {imageDataProduct[0].fileUrl
                ? imageDataProduct.map((imageUrl) => {
                    return (
                      <img
                        className="w-20 h-20"
                        key={imageUrl.fileUrl}
                        src={imageUrl.fileUrl}
                        alt={imageUrl.fileName}
                      />
                    )
                  })
                : product.imageUrls.map((imageUrl) => {
                    return (
                      <img
                        key={imageUrl}
                        className="w-10"
                        src={imageUrl}
                        alt=""
                      />
                    )
                  })}
            </div>
          </div>

          <div>
            <UploadButton<OurFileRouter>
              endpoint="imageShoppingStore"
              onClientUploadComplete={(res) => {
                res && setImageDataProduct(res)
                alert('Imagens da categoria salva no banco Uploadthing!')
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`)
              }}
              className="bg-green-800 p-1 text-xs rounded-md"
            />
          </div>
        </div>

        <div>
          <label>
            Preço base
            <Input
              className="bg-zinc-300 text-zinc-950"
              defaultValue={Number(product.basePrice)}
              {...register('basePrice')}
            />
            <FormError errors={errors.basePrice?.message} />
          </label>

          <label>
            Disconto
            <Input
              className="bg-zinc-300 text-zinc-950"
              defaultValue={product.discountPercentage}
              {...register('discountPercentage')}
            />
            <FormError errors={errors.discountPercentage?.message} />
          </label>

          <label>
            Descrição
            <textarea
              className="bg-zinc-300 text-zinc-950 resize-none w-full h-40"
              defaultValue={product.description}
              {...register('description')}
            ></textarea>
            <FormError errors={errors.description?.message} />
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-green-500 p-2 rounded-md"
          disabled={isSubmitting}
          type="submit"
        >
          Atualizar
        </button>

        <button
          className="bg-red-500 p-2 rounded-md"
          type="button"
          onClick={handleDeleteProduct}
        >
          Deletar
        </button>
      </div>
    </form>
  )
}
