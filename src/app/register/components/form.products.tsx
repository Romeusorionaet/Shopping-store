'use client'

import { UploadButton } from '@uploadthing/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { FormError } from '@/components/form/form-error'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { createProduct } from '@/actions/register/products/create'

interface ImageDataProps {
  fileName: string
  fileUrl: string
}

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres.' })
    .transform(
      (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
    ),
  slug: z
    .string()
    .min(3, { message: 'No mínimo 3 caracteres.' })
    .toLowerCase()
    .transform((val) => val.replace(/\s+/g, '-')),
  description: z.string().min(20, { message: 'No mínimo 20 caracteres.' }),
  basePrice: z.string().min(1, { message: 'Informe o valor do produto.' }),
  category: z.string().refine((value) => value !== 'Selecione', {
    message: 'A qual categoria o seu produto pertence?',
  }),
  discountPercentage: z
    .string()
    .min(1, { message: 'Informe o valor do desconto.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

interface Props {
  listOfCategory:
    | {
        id: string
        name: string
        slug: string
        imageUrl: string
      }[]
    | undefined
}

export function FormProduct({ listOfCategory }: Props) {
  const [imageDataProducts, setImageDataProducts] = useState<ImageDataProps[]>([
    { fileName: '', fileUrl: '' },
  ])

  const [categoryId, setCategoryId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegisterProduct(data: RegisterFormData) {
    const { name, slug, basePrice, description, discountPercentage } = data

    if (imageDataProducts.length !== 4) {
      alert('É importante que tenha 4 imagens para o seu produto.')
      return
    }

    const imageUrls = imageDataProducts.map((item) => item.fileUrl)

    const dataProduct = {
      name,
      slug,
      description,
      imageUrls,
      basePrice,
      categoryId,
      discountPercentage: parseFloat(discountPercentage),
    }

    try {
      const result = await createProduct({ dataProduct })
      alert(result?.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit(handleRegisterProduct)}>
      <div className="flex flex-col gap-2 justify-around items-center">
        <UploadButton<OurFileRouter>
          endpoint="imageShoppingStore"
          onClientUploadComplete={(res) => {
            res && setImageDataProducts(res)
            alert('Imagem da categoria salva no banco Uploadthing!')
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`)
          }}
          className="bg-green-500 p-1 w-[6rem] text-xs rounded-md"
        />

        <div className="border border-zinc-50/40 flex gap-2 flex-wrap justify-center p-2">
          {imageDataProducts[0].fileUrl ? (
            imageDataProducts.map((item) => {
              return (
                <div
                  key={item.fileName}
                  className="flex flex-col gap-2 items-center w-[6rem] h-[6rem]"
                >
                  {item.fileUrl && (
                    <Image
                      width={200}
                      height={200}
                      className="h-full w-full"
                      src={item.fileUrl}
                      alt={item.fileName}
                    />
                  )}
                  <p className="text-xs opacity-50">
                    {imageDataProducts && imageDataProducts[0].fileName}
                  </p>
                </div>
              )
            })
          ) : (
            <div>
              <p className="opacity-50 text-xs text-center">sem imagem</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <label className="flex flex-col gap-2">
          Categoria do produto
          <select
            className="bg-slate-800 p-2 rounded-md appearance-none text-white outline-none focus:border-transparent focus:outline-blue-500"
            {...register('category')}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="Selecione">Selecione</option>
            {listOfCategory &&
              listOfCategory.map((value, index) => {
                return (
                  <option className="bg-slate-700" key={index} value={value.id}>
                    {value.name}
                  </option>
                )
              })}
          </select>
          <FormError errors={errors.category?.message} />
        </label>

        <label className="flex flex-col gap-2">
          Nome
          <Input
            className="bg-zinc-600"
            type="text"
            placeholder="name"
            {...register('name')}
          />
          <FormError errors={errors.name?.message} />
        </label>

        <label className="flex flex-col gap-2">
          Slug
          <Input
            className="bg-zinc-600"
            type="text"
            placeholder="slug"
            {...register('slug')}
          />
          <FormError errors={errors.slug?.message} />
        </label>

        <label className="flex flex-col gap-2">
          Descrição
          <textarea
            className="bg-zinc-600 h-40 resize-none"
            maxLength={200}
            placeholder="Descrição do produto"
            {...register('description')}
          ></textarea>
          <FormError errors={errors.description?.message} />
        </label>

        <label className="flex flex-col gap-2">
          Preço base
          <Input
            className="bg-zinc-600"
            type="number"
            placeholder="Valor bruto"
            {...register('basePrice')}
          />
          <FormError errors={errors.basePrice?.message} />
        </label>

        <label className="flex flex-col gap-2">
          Desconto / Sem disconto = 0
          <Input
            className="bg-zinc-600"
            type="number"
            placeholder="15"
            {...register('discountPercentage')}
          />
          <FormError errors={errors.discountPercentage?.message} />
        </label>

        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md text-white"
          disabled={isSubmitting}
        >
          Salvar
        </button>
      </div>
    </form>
  )
}
