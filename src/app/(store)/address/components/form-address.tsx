'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormError } from '@/components/form/form-error'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { useNotification } from '@/hooks/use-notifications'
import { CheckoutCart } from './checkout-cart'
import { useContext, useState } from 'react'
import { ChangeableAddressInformation } from '@/components/address-information/changeable-address-information'
import { AddressProps } from '@/core/@types/api-store'
import { UserContext } from '@/providers/user-context'
import { createUserAddress } from '@/actions/address'

const addressFormSchema = z.object({
  username: z.string().min(1, 'Este campo é obrigatório.'),
  email: z.string().min(1, 'Este campo é obrigatório.'),
  phoneNumber: z.string().min(1, 'Este campo é obrigatório.'),
  cep: z.string().min(8, 'O CEP deve ter 8 números.'),
  city: z.string().min(1, 'Este campo é obrigatório.'),
  uf: z.string().min(1, 'Este campo é obrigatório.'),
  street: z.string().min(1, 'Este campo é obrigatório.'),
  neighborhood: z.string().min(1, 'Este campo é obrigatório.'),
  houseNumber: z.string().min(1, 'Este campo é obrigatório.'),
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

  const [userAddressSaved, setUserAddressSaved] = useState<AddressProps | null>(
    null,
  )
  const { notifySuccess, notifyError } = useNotification()

  const { profile } = useContext(UserContext)
  const userId = profile.id

  const emailDefault = profile.email ? profile.email : ''

  async function handleAddressForm(data: AddressFormData) {
    const result = await createUserAddress(data, userId)

    if (result.success) {
      reset()
      notifySuccess(result.message)
    } else {
      notifyError(result.message)
    }
  }

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
        className="mx-auto mt-8 max-w-[800px] rounded-md border border-base_color_dark/10 p-2"
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
                    placeholder="nome e sobrenome"
                    className="bg-transparent"
                    defaultValue={'hu'}
                    {...register('username')}
                  />
                  <FormError errors={errors.username?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  E-mail
                  <Input
                    type="text"
                    maxLength={30}
                    placeholder="exemplo@gmail.com"
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
                    placeholder="12345678"
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
                    placeholder="Sua cidade"
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
                    placeholder="UF da cidade"
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
                    placeholder="Número da redidência"
                    className="bg-transparent"
                    {...register('houseNumber')}
                  />
                  <FormError errors={errors.houseNumber?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  Complemento
                  <Input
                    type="text"
                    maxLength={50}
                    placeholder="EX: Ao lado do shopping"
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

      <div className="mx-auto flex max-w-[800px] justify-end">
        <CheckoutCart userHasAddress={userHasAddress} />
      </div>
    </div>
  )
}
