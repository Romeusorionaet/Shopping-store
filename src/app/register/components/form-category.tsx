'use client'

import { UploadButton } from '@uploadthing/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategory } from '@/actions/register/category/create'
import { useState } from 'react'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { FormError } from '@/components/form/form-error'

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
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function FormCategory() {
  const [imageDataCategory, setImageDataCategory] = useState<ImageDataProps[]>([
    { fileName: '', fileUrl: '' },
  ])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  console.log(errors)

  async function handleRegisterProduct(data: RegisterFormData) {
    const { name, slug } = data

    const dataCategory = {
      name,
      slug,
      fileUrl: imageDataCategory[0].fileUrl,
    }

    try {
      const result = await createCategory({ dataCategory })
      alert(result?.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit(handleRegisterProduct)}>
      <div className="flex justify-around items-center">
        <UploadButton<OurFileRouter>
          endpoint="imageShoppingStore"
          onClientUploadComplete={(res) => {
            res && setImageDataCategory(res)
            alert('Imagem da categoria salva no banco Uploadthing!')
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`)
          }}
          className="bg-green-500 p-1 w-[6rem] text-xs rounded-md"
        />

        <div className="border border-zinc-50/40 w-[6rem] h-[6rem]">
          {imageDataCategory[0].fileUrl ? (
            <div className="flex flex-col gap-2 items-center">
              <img
                width={0}
                className="h-full w-full"
                src={imageDataCategory[0].fileUrl}
                alt={imageDataCategory[0].fileName}
              />
              <p className="text-xs opacity-50">
                {imageDataCategory && imageDataCategory[0].fileName}
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="opacity-50 text-xs text-center">sem imagem</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <label className="flex flex-col gap-2">
          Nome
          <input
            className="bg-zinc-600"
            type="text"
            placeholder="name"
            {...register('name')}
          />
          <FormError errors={errors.name?.message} />
        </label>

        <label className="flex flex-col gap-2">
          Slug
          <input
            className="bg-zinc-600"
            type="text"
            placeholder="slug"
            {...register('slug')}
          />
          <FormError errors={errors.slug?.message} />
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
