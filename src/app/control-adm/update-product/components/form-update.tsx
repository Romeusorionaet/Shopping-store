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
import Image from 'next/image'
import { updateProduct } from '@/actions/update/product'
import { useRouter } from 'next/navigation'
import { deleteProduct } from '@/actions/delete/product'
import { Trash } from 'lucide-react'

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
        <label className="flex flex-col gap-2">
          Nome
          <Input defaultValue={product.name} {...register('name')} />
          <FormError errors={errors.name?.message} />
        </label>

        <div className="flex flex-col justify-center items-center gap-4 mt-2">
          <div className="w-full flex flex-col items-center">
            {imageDataProduct[0].fileUrl ? (
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-20 h-20"
                src={imageDataProduct[0].fileUrl}
                alt={imageDataProduct[0].fileName}
              />
            ) : (
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-40 h-40"
                src={product.imageUrls[0]}
                alt={product.name}
              />
            )}

            <div className="flex mt-4">
              {imageDataProduct[0].fileUrl
                ? imageDataProduct.map((imageUrl) => {
                    return (
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-20 h-20"
                        key={imageUrl.fileUrl}
                        src={imageUrl.fileUrl}
                        alt={imageUrl.fileName}
                      />
                    )
                  })
                : product.imageUrls.map((imageUrl) => {
                    return (
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        key={imageUrl}
                        className="w-20 h-20"
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
              className="bg-green-500/40 pb-2 w-[6rem] text-xs rounded-md text-center"
            />
          </div>
        </div>

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
        <button
          className="bg-green-500/40 text-sm p-2 rounded-md border-b border-zinc-500/60 duration-700 hover:bg-green-500"
          disabled={isSubmitting}
          type="submit"
        >
          Atualizar
        </button>

        <button
          onClick={handleDeleteProduct}
          className="text-red-400 p-2 rounded-md"
        >
          <Trash size={28} />
        </button>
      </div>
    </form>
  )
}
