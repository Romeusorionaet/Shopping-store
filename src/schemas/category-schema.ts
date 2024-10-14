import { z } from 'zod'

export const categoryCreateSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório' }).max(30, {
    message: 'Título longo. Máximo 30 caracteres permitido.',
  }),
})
