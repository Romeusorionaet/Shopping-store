import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email('Precisa ser um email válido'),
  password: z.string().min(6, { message: 'No mínimo 6 digitos' }),
})
