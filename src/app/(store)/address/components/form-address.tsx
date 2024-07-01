'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { FormError } from '@/components/form/form-error'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { CheckoutCart } from './checkout-cart'
import {
  AddressFormData,
  addressFormSchema,
} from '../schemas/address-form-schema'
import { useAddressForm } from '@/hooks/use-address-form'

export function FormAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const {
    isLoading,
    oldAddress,
    textButtonSubmitForm,
    iconBasedOnAddress,
    handleAddressForm,
  } = useAddressForm()

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-8 max-w-[800px] rounded-md border border-base_color_dark/10 p-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex w-full justify-between">
            <span>Preencher formulário</span>{' '}
            {isLoading ? '...' : iconBasedOnAddress}
          </AccordionTrigger>
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
                    defaultValue={oldAddress?.username}
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
                    defaultValue={oldAddress?.email}
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
                    defaultValue={oldAddress?.phoneNumber}
                    {...register('phoneNumber')}
                  />
                  <FormError errors={errors.phoneNumber?.message} />
                </label>

                <label className="flex flex-col gap-1">
                  CEP
                  <Input
                    type="number"
                    inputMode="decimal"
                    id="cep"
                    placeholder="12345678"
                    className="bg-transparent"
                    defaultValue={oldAddress?.cep}
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
                    defaultValue={oldAddress?.city}
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
                    defaultValue={oldAddress?.uf}
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
                    defaultValue={oldAddress?.neighborhood}
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
                    defaultValue={oldAddress?.street}
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
                    defaultValue={oldAddress?.houseNumber}
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
                    defaultValue={oldAddress?.complement}
                    {...register('complement')}
                  />
                  <FormError errors={errors.complement?.message} />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="mt-8 hover:text-base_color_text_top"
                  aria-disabled={isSubmitting}
                >
                  {textButtonSubmitForm}
                </Button>

                {iconBasedOnAddress}
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mx-auto mb-28 flex max-w-[800px] justify-end">
        <CheckoutCart userHasAddress={!!oldAddress} />
      </div>
    </div>
  )
}
