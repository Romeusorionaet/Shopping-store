'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormError } from '@/components/form/form-error'
import { Input } from '@/components/ui/input'
// import { createCategory } from '@/actions/register/category'
import Image from 'next/image'
import { ArrowBigRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/generate-components'
import { useNotification } from '@/hooks/use-notifications'

interface ImageDataProps {
  name: string
  url: string
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
    { name: '', url: '' },
  ])

  const { notifyError, notifySuccess } = useNotification()

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

    if (imageDataCategory[0].url === '') {
      notifyError('Escolha uma imagem que represente a categoria')
      return
    }

    const newSlug = name.toLowerCase().replace(/ /g, '-')

    const dataCategory = {
      name,
      slug: newSlug,
      fileUrl: imageDataCategory[0].url,
    }

    try {
      // const result = await createCategory({ dataCategory })

      // if (result.messageSuccess) {
      //   notifySuccess(result.messageSuccess)
      // } else if (result.messageError) {
      //   notifyError(result.messageError)
      // }

      reset()
      setImageDataCategory([{ name: '', url: '' }])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="my-10 rounded-md border border-white/20 p-2"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Cadastrar categoria</AccordionTrigger>
        <AccordionContent className="mt-6">
          <form method="post" onSubmit={handleSubmit(handleRegisterProduct)}>
            <div className="flex items-center justify-around">
              <UploadButton
                endpoint="imageShoppingStore"
                onClientUploadComplete={(res) => {
                  res && setImageDataCategory(res)
                  notifySuccess('Imagem da categoria salva')
                }}
                onUploadError={(error: Error) => {
                  notifyError(`ERROR! ${error.message}`)
                }}
              />

              <ArrowBigRight />

              <div className="h-[6rem] w-[6rem] border border-white/20">
                {imageDataCategory[0].url ? (
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-auto"
                      src={imageDataCategory[0].url}
                      alt={imageDataCategory[0].name}
                    />
                    <p className="text-xs opacity-50">
                      {imageDataCategory && imageDataCategory[0].name}
                    </p>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-xs opacity-50">sem imagem</p>
                  </div>
                )}
              </div>
            </div>

            <div className="my-4 flex flex-col">
              <label className="mb-4 flex flex-col gap-2">
                Nome
                <Input
                  className="bg-white/20"
                  type="text"
                  placeholder="name"
                  {...register('name')}
                />
                <FormError errors={errors.name?.message} />
              </label>

              <Button
                type="submit"
                className="text-base_color_dark disabled:bg-white/20"
                disabled={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
