'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAddress } from '@/actions/address'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormError } from '@/components/form/form-error'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'

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

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const { data } = useSession()
  const userId = data?.user.id
  const router = useRouter()

  async function handleAddressForm(data: AddressFormData) {
    if (!userId) {
      return
    }

    try {
      await createAddress({
        dataAddress: data,
        userId,
      })
    } catch (err) {
      console.log(err)
    }
    router.refresh()
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="border border-zinc-500/60 mt-8 p-2 rounded-md"
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
                  placeholder="Nome completo"
                  className="bg-transparent border border-zinc-400"
                  {...register('username')}
                />
                <FormError errors={errors.username?.message} />
              </label>

              <label className="flex flex-col gap-1">
                E-mail
                <Input
                  type="text"
                  maxLength={30}
                  placeholder="e-mail"
                  className="bg-transparent border border-zinc-400"
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
                  className="bg-transparent border border-zinc-400"
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
                  placeholder="CEP"
                  className="bg-transparent border border-zinc-400"
                  {...register('cep')}
                />
                <FormError errors={errors.cep?.message} />
              </label>

              <label className="flex flex-col gap-1">
                Cidade
                <Input
                  type="text"
                  maxLength={30}
                  placeholder="Cidade"
                  className="bg-transparent border border-zinc-400"
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
                  className="bg-transparent border border-zinc-400"
                  {...register('uf')}
                />
                <FormError errors={errors.uf?.message} />
              </label>

              <label className="flex flex-col gap-1">
                Bairro
                <Input
                  type="text"
                  maxLength={30}
                  placeholder="Bairro"
                  className="bg-transparent border border-zinc-400"
                  {...register('neighborhood')}
                />
                <FormError errors={errors.neighborhood?.message} />
              </label>

              <label className="flex flex-col gap-1">
                Rua
                <Input
                  type="text"
                  placeholder="Rua"
                  className="bg-transparent border border-zinc-400"
                  {...register('street')}
                />
                <FormError errors={errors.street?.message} />
              </label>

              <label className="flex flex-col gap-1">
                Número
                <Input
                  type="number"
                  maxLength={10}
                  placeholder="Número"
                  className="bg-transparent border border-zinc-400"
                  {...register('number')}
                />
                <FormError errors={errors.number?.message} />
              </label>

              <label className="flex flex-col gap-1">
                Complemento
                <Input
                  type="text"
                  maxLength={50}
                  placeholder="Complemento"
                  className="bg-transparent border border-zinc-400"
                  {...register('complement')}
                />
                <FormError errors={errors.complement?.message} />
              </label>
            </div>

            <Button
              type="submit"
              className="data-[disabled=true]:cursor-not-allowed border bg-amber-100 hover:bg-amber-200 duration-700"
              aria-disabled={isSubmitting}
            >
              salvar
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
