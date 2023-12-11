'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAddress } from '@/actions/address'
import { useSession } from 'next-auth/react'
import { FormError } from '@/components/form/form-error'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { useNotification } from '@/hooks/use-notifications'
import { Address } from '@prisma/client'
import { CheckoutCart } from './checkout-cart'
import { useEffect, useState } from 'react'
import { ChangeableAddressInformation } from '@/components/address-information/changeable-address-information'
import Cookies from 'js-cookie'
import { getAddressFromCookies } from '@/utils/get-address-from-cookies'

const addressFormSchema = z.object({
  username: z.string().min(1, 'Este campo é obrigatório.'),
  email: z.string().min(1, 'Este campo é obrigatório.'),
  phoneNumber: z.string().min(1, 'Este campo é obrigatório.'),
  cep: z.string().min(8, 'O CEP deve ter 8 números.'),
  city: z.string().min(1, 'Este campo é obrigatório.'),
  uf: z.string().min(1, 'Este campo é obrigatório.'),
  street: z.string().min(1, 'Este campo é obrigatório.'),
  neighborhood: z.string().min(1, 'Este campo é obrigatório.'),
  number: z.string().min(1, 'Este campo é obrigatório.'),
  complement: z.string().min(1, 'Este campo é obrigatório.'),
})

export type AddressFormData = z.infer<typeof addressFormSchema>

export function FormAddress() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const [userAddressSaved, setUserAddressSaved] = useState<Address | null>(null)
  const { notifySuccess, notifyError } = useNotification()

  const { data } = useSession()
  const userId = data?.user.id

  const emailDefault = data?.user.email ? data.user.email : ''

  async function handleAddressForm(data: AddressFormData) {
    if (!userId) {
      return null
    }

    try {
      const result = await createAddress({
        dataAddress: data,
        userId,
      })

      if (result.newAddress) {
        Cookies.set(
          '@shopping-store/address',
          JSON.stringify(result.newAddress),
        )
      } else if (result.updatedAddress) {
        Cookies.set(
          '@shopping-store/address',
          JSON.stringify(result.updatedAddress),
        )
      }

      reset()
      window.location.reload()
      notifySuccess(result.message)
    } catch (err) {
      notifyError('Tente novamente mais tarde')
    }
  }

  useEffect(() => {
    const addressFromCookies = getAddressFromCookies()
    if (addressFromCookies) {
      setUserAddressSaved(addressFromCookies)
    }
  }, [])

  const userHasAddress = !!userAddressSaved

  return (
    <div>
      <div className="my-4">
        {userAddressSaved ? (
          <ChangeableAddressInformation address={userAddressSaved} />
        ) : (
          <></>
        )}
      </div>

      <Accordion
        type="single"
        collapsible
        className="border border-base_color_dark/10 mt-8 p-2 rounded-md max-w-[800px] mx-auto"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Preencher formulário</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleSubmit(handleAddressForm)} className="mt-10">
              <div className="space-y-4">
                <label className="flex flex-col gap-1">
                  Nome completo
                  <Input
                    type="text"
                    maxLength={30}
                    placeholder="nome sobrenome"
                    className="bg-transparent"
                    {...register('username')}
                  />
                  <FormError errors={errors.username?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  E-mail
                  <Input
                    type="text"
                    maxLength={30}
                    placeholder="usuario@gmail.com"
                    className="bg-transparent"
                    defaultValue={emailDefault}
                    {...register('email')}
                  />
                  <FormError errors={errors.email?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Número para contato
                  <Input
                    type="number"
                    maxLength={30}
                    placeholder="Número de telefone"
                    className="bg-transparent"
                    {...register('phoneNumber')}
                  />
                  <FormError errors={errors.username?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  CEP
                  <Input
                    type="number"
                    inputMode="decimal"
                    id="cep"
                    placeholder="59190000"
                    className="bg-transparent"
                    {...register('cep')}
                  />
                  <FormError errors={errors.cep?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Cidade
                  <Input
                    type="text"
                    maxLength={30}
                    placeholder="Canguaretama"
                    className="bg-transparent"
                    {...register('city')}
                  />
                  <FormError errors={errors.city?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  UF
                  <Input
                    type="text"
                    maxLength={2}
                    placeholder="RN"
                    className="bg-transparent"
                    {...register('uf')}
                  />
                  <FormError errors={errors.uf?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Bairro
                  <Input
                    type="text"
                    maxLength={30}
                    placeholder="Nome do seu Bairro"
                    className="bg-transparent"
                    {...register('neighborhood')}
                  />
                  <FormError errors={errors.neighborhood?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Rua
                  <Input
                    type="text"
                    placeholder="Nome da sua Rua"
                    className="bg-transparent"
                    {...register('street')}
                  />
                  <FormError errors={errors.street?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Número
                  <Input
                    type="number"
                    maxLength={10}
                    placeholder="Número da casa"
                    className="bg-transparent"
                    {...register('number')}
                  />
                  <FormError errors={errors.number?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Complemento
                  <Input
                    type="text"
                    maxLength={50}
                    placeholder="Próximo ao ???"
                    className="bg-transparent"
                    {...register('complement')}
                  />
                  <FormError errors={errors.complement?.message} />
                </label>
              </div>

              <Button
                type="submit"
                className="mt-8"
                aria-disabled={isSubmitting}
              >
                salvar
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end max-w-[800px] mx-auto">
        <CheckoutCart userHasAddress={userHasAddress} />
      </div>
    </div>
  )
}
