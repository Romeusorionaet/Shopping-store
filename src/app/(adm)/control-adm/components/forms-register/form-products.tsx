'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormError } from '@/components/form/form-error'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
// import { createProduct } from '@/actions/register/products'
import { ArrowBigDown, DollarSign, Percent } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { Button } from '@/components/ui/button'
import '@uploadthing/react/styles.css'
import { UploadButton } from '@/utils/generate-components'
import { useNotification } from '@/hooks/use-notifications'
// import { ModeOfSale } from '@prisma/client'

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
  description: z.string().min(20, { message: 'No mínimo 20 caracteres.' }),
  basePrice: z.string().min(1, { message: 'Informe o valor do produto.' }),
  category: z.string().refine((value) => value !== 'Selecione', {
    message: 'A qual categoria o seu produto pertence?',
  }),
  discountPercentage: z
    .string()
    .min(1, { message: 'Informe o valor do desconto.' }),
  quantity: z.string().nullable(),
  placeOfSale: z.string(),
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
    { name: '', url: '' },
  ])

  const { notifyError, notifySuccess } = useNotification()

  const [categoryId, setCategoryId] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegisterProduct(data: RegisterFormData) {
    const {
      name,
      basePrice,
      description,
      discountPercentage,
      quantity,
      placeOfSale,
    } = data
    const newSlug = name.toLowerCase().replace(/ /g, '-')

    // const salesLocationType =
    //   placeOfSale === 'Sim'
    //     ? ModeOfSale.ONLINE_STORE
    //     : ModeOfSale.SELL_IN_REGION_ONLY

    if (imageDataProducts.length !== 4) {
      notifyError({
        message: 'É importante que tenha 4 imagens para o seu produto',
        origin: 'client',
      })
      return
    }

    const imageUrls = imageDataProducts.map((item) => item.url)

    const dataProduct = {
      name,
      slug: newSlug,
      description,
      imageUrls,
      basePrice,
      categoryId,
      discountPercentage: parseFloat(discountPercentage),
      quantity: Number(quantity) === 0 ? 1 : Number(quantity),
      // placeOfSale: salesLocationType,
    }

    try {
      // const result = await createProduct({ dataProduct })
      reset()

      // if (result.messageSuccess) {
      //   notifySuccess(result.messageSuccess)
      // } else if (result.messageError) {
      //   notifyError(result.messageError)
      // }
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
        <AccordionTrigger>Cadastrar produto</AccordionTrigger>
        <AccordionContent className="mt-6">
          <form method="post" onSubmit={handleSubmit(handleRegisterProduct)}>
            <div className="flex flex-col items-center justify-around gap-2">
              <UploadButton
                endpoint="imageShoppingStore"
                onClientUploadComplete={(res) => {
                  res && setImageDataProducts(res)
                  notifySuccess({
                    message: 'Imagem da categoria salva',
                    origin: 'client',
                  })
                }}
                onUploadError={(error: Error) => {
                  console.log('Error', error)
                  notifyError({ message: error.message, origin: 'client' })
                }}
              />

              <ArrowBigDown />

              <div className="flex flex-wrap justify-center gap-8 border border-white/20 p-2 pb-10">
                {imageDataProducts[0].url ? (
                  imageDataProducts.map((item) => {
                    return (
                      <div
                        key={item.name}
                        className="flex h-[6rem] w-[6rem] flex-col items-center gap-2"
                      >
                        {item.url && (
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-full w-auto"
                            src={item.url}
                            alt={item.name}
                          />
                        )}
                        <p className="text-xs opacity-50">
                          {imageDataProducts && imageDataProducts[0].name}
                        </p>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-xs opacity-50">sem imagem</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col space-y-4">
              <label className="flex flex-col gap-2">
                Escolha a categoria do produto
                <select
                  className="appearance-none rounded-md border border-white/20 bg-black p-2 text-white"
                  {...register('category')}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="Selecione">Selecione</option>
                  {listOfCategory &&
                    listOfCategory.map((value, index) => {
                      return (
                        <option
                          className="bg-base_color_dark"
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

              <label className="mt-2 flex flex-col gap-2">
                <span>Faz entrega deste produto para todo Brasil?</span>

                <p className="text-xs opacity-90">Valor padrão: {'Sim'}</p>

                <select
                  className="appearance-none rounded-md border border-white/20 bg-black p-2 text-white"
                  {...register('placeOfSale')}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                Descrição
                <textarea
                  className="h-40 resize-none rounded-md bg-base_color_dark p-2"
                  maxLength={200}
                  placeholder="Descrição do produto..."
                  {...register('description')}
                ></textarea>
                <FormError errors={errors.description?.message} />
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
