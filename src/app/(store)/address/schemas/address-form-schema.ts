import { z } from 'zod'

const phoneNumberMessage = 'Informe um número válido. Exemplo: 84981127596'

export const addressFormSchema = z.object({
  username: z.string().min(1, 'Este campo é obrigatório.'),
  email: z.string().min(1, 'Este campo é obrigatório.'),
  phoneNumber: z
    .string()
    .min(11, { message: phoneNumberMessage })
    .max(11, { message: phoneNumberMessage }),
  cep: z.coerce.number().min(8, 'O CEP deve ter 8 números.'),
  city: z.string().min(1, 'Este campo é obrigatório.'),
  uf: z.string().min(1, 'Este campo é obrigatório.'),
  street: z.string().min(1, 'Este campo é obrigatório.'),
  neighborhood: z.string().min(1, 'Este campo é obrigatório.'),
  houseNumber: z.coerce.number().min(1, 'Este campo é obrigatório.'),
  complement: z.string().min(1, 'Este campo é obrigatório.'),
})

export type AddressFormData = z.infer<typeof addressFormSchema>
