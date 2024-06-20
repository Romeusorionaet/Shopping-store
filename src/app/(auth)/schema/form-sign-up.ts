import { z } from 'zod'

export const signUpFormSchema = z
  .object({
    username: z.string().min(1, { message: 'Nome e sobrenome é obrigatório' }),
    email: z.string().email('Precisa ser um email válido'),
    password: z.string().min(6, { message: 'No mínimo 6 digitos' }),
    passwordRepeat: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordRepeat
    },
    {
      message: 'As senhas não coincidem',
      path: ['passwordRepeat'],
    },
  )
