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
import { createProduct } from '@/actions/register/products'
import { ArrowBigDown, DollarSign, Percent } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { Button } from '@/components/ui/button'

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
  description: z.string().min(20, { message: 'No mínimo 20 caracteres.' }),
  basePrice: z.string().min(1, { message: 'Informe o valor do produto.' }),
  category: z.string().refine((value) => value !== 'Selecione', {
    message: 'A qual categoria o seu produto pertence?',
  }),
  discountPercentage: z
    .string()
    .min(1, { message: 'Informe o valor do desconto.' }),
  quantity: z.string().nullable(),
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
    const { name, basePrice, description, discountPercentage, quantity } = data
    const newSlug = name.toLowerCase().replace(/ /g, '-')

    if (imageDataProducts.length !== 4) {
      alert('É importante que tenha 4 imagens para o seu produto.')
      return
    }

    const imageUrls = imageDataProducts.map((item) => item.fileUrl)

    const dataProduct = {
      name,
      slug: newSlug,
      description,
      imageUrls,
      basePrice,
      categoryId,
      discountPercentage: parseFloat(discountPercentage),
      quantity: Number(quantity) === 0 ? 1 : Number(quantity),
    }

    try {
      const result = await createProduct({ dataProduct })
      alert(result?.message)
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
        <AccordionTrigger>Cadastrar produto</AccordionTrigger>
        <AccordionContent className="mt-6">
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
                className="bg-green-500/40 pb-2 w-[6rem] text-xs rounded-md text-center"
              />

              <ArrowBigDown />

              <div className="border border-zinc-50/40 flex flex-wrap gap-8 justify-center p-2 pb-10">
                {imageDataProducts[0].fileUrl ? (
                  imageDataProducts.map((item) => {
                    return (
                      <div
                        key={item.fileName}
                        className="flex flex-col gap-2 items-center w-[6rem] h-[6rem]"
                      >
                        {item.fileUrl && (
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-full w-auto"
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
                  <div className="flex justify-center items-center h-full">
                    <p className="opacity-50 text-xs">sem imagem</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-4 mt-10">
              <label className="flex flex-col gap-2">
                Escolha a categoria do produto
                <select
                  className="p-2 rounded-md appearance-none border border-zinc-200 text-white bg-black"
                  {...register('category')}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="Selecione">Selecione</option>
                  {listOfCategory &&
                    listOfCategory.map((value, index) => {
                      return (
                        <option
                          className="bg-zinc-900"
                          key={index}
                          value={value.id}
                        >
                          {value.name}
                        </option>
                      )
                    })}
                </select>
                <FormError errors={errors.category?.message} />
              </label>

              <label className="flex flex-col gap-2">
                Nome
                <Input placeholder="nome" {...register('name')} />
                <FormError errors={errors.name?.message} />
              </label>

              <label className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>Preço base</span>
                  <DollarSign size={20} color="#00FF00" />
                </div>
                <Input
                  type="number"
                  placeholder="valor bruto"
                  {...register('basePrice')}
                />
                <FormError errors={errors.basePrice?.message} />
              </label>

              <label className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>Desconto</span>
                  <Percent size={20} color="#00FF00" />
                </div>

                <p className="text-xs opacity-90">
                  para produtos sem desconto preencher com valor 0
                </p>

                <Input
                  type="number"
                  placeholder="15"
                  {...register('discountPercentage')}
                />
                <FormError errors={errors.discountPercentage?.message} />
              </label>

              <label className="flex flex-col gap-2">
                <span>Quantidade</span>

                <p className="text-xs opacity-90">
                  Opcional, valor padrão será 1
                </p>

                <Input placeholder="1" {...register('quantity')} />
              </label>

              <label className="flex flex-col gap-2">
                Descrição
                <textarea
                  className="bg-zinc-800 h-40 resize-none p-2 rounded-md"
                  maxLength={200}
                  placeholder="Descrição do produto..."
                  {...register('description')}
                ></textarea>
                <FormError errors={errors.description?.message} />
              </label>

              <Button
                type="submit"
                className="text-zinc-950 disabled:bg-zinc-400"
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
