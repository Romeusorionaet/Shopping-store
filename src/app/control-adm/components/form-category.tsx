'use client'

import { UploadButton } from '@uploadthing/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { FormError } from '@/components/form/form-error'
import { Input } from '@/components/ui/input'
import { createCategory } from '@/actions/register/category'
import Image from 'next/image'
import { ArrowBigRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'

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
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function FormCategory() {
  const [imageDataCategory, setImageDataCategory] = useState<ImageDataProps[]>([
    { fileName: '', fileUrl: '' },
  ])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegisterProduct(data: RegisterFormData) {
    const { name } = data

    if (imageDataCategory[0].fileUrl === '') {
      alert('Escolha uma imagem que represente a categoria.')
      return
    }

    const newSlug = name.toLowerCase().replace(/ /g, '-')

    const dataCategory = {
      name,
      slug: newSlug,
      fileUrl: imageDataCategory[0].fileUrl,
    }

    try {
      const result = await createCategory({ dataCategory })
      alert(result?.message)
      reset()
      setImageDataCategory([{ fileName: '', fileUrl: '' }])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="border border-zinc-500/60 my-10 p-2 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Cadastrar categoria</AccordionTrigger>
        <AccordionContent className="mt-6">
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
                className="bg-green-500/40 pb-2 w-[6rem] text-xs rounded-md text-center"
              />

              <ArrowBigRight />

              <div className="border border-zinc-50/40 w-[6rem] h-[6rem]">
                {imageDataCategory[0].fileUrl ? (
                  <div className="flex flex-col gap-2 items-center">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-auto"
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

            <div className="flex flex-col my-4">
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

              <button
                type="submit"
                className="bg-green-500 p-2 rounded-md text-white disabled:bg-zinc-400"
                disabled={isSubmitting}
              >
                Salvar
              </button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
