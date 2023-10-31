'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAddress } from '@/actions/address'
import { useSession } from 'next-auth/react'

const addressFormSchema = z.object({
  cep: z.string().min(8, 'O CEP deve ter 8 números.'),
  city: z.string(),
  uf: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  complement: z.string(),
  username: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
})

export type AddressFormData = z.infer<typeof addressFormSchema>

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const { data } = useSession()
  const userId = data?.user.id

  console.log(errors)

  async function handleAddressForm(data: AddressFormData) {
    if (!userId) {
      return
    }

    try {
      const response = await createAddress({
        dataAddress: data,
        userId,
      })

      console.log(response)
    } catch (err) {
      console.log(err)
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleAddressForm)}>
      <div>
        <Input
          type="number"
          inputMode="decimal"
          id="cep"
          placeholder="CEP"
          {...register('cep')}
        />
        <Input
          type="text"
          maxLength={30}
          placeholder="Cidade"
          {...register('city')}
        />
        <Input type="text" maxLength={2} placeholder="UF" {...register('uf')} />
        <Input
          type="text"
          maxLength={30}
          placeholder="Bairro"
          {...register('neighborhood')}
        />
        <Input type="text" placeholder="Rua" {...register('street')} />
        <Input
          type="number"
          maxLength={10}
          placeholder="Número"
          {...register('number')}
        />
        <Input
          type="text"
          maxLength={30}
          placeholder="Complemento"
          {...register('complement')}
        />
        <Input
          type="text"
          maxLength={30}
          placeholder="Nome completo"
          {...register('username')}
        />
        <Input
          type="number"
          maxLength={30}
          placeholder="Número de telefone"
          {...register('phoneNumber')}
        />
        <Input
          type="text"
          maxLength={30}
          placeholder="e-mail"
          {...register('email')}
        />
      </div>
      {/* Método de entrega: Você pode querer adicionar um campo ou uma seleção para
      permitir que os clientes escolham um método de entrega preferido, como
      entrega padrão, entrega expressa ou retirada na loja. */}

      <Button
        type="submit"
        className="data-[disabled=true]:cursor-not-allowed"
        aria-disabled={isSubmitting}
      >
        salvar
      </Button>
    </form>
  )
}
