import { ModeOfSale } from '@/core/@types/api-store'
import { z } from 'zod'

const defaultMessageError = 'Campo obrigatório'

const baseProductSchema = z.object({
  title: z.string().min(1, { message: defaultMessageError }).max(100, {
    message:
      'O Título do seu produto deve conter no máximo 100 caracteres. Informações mais detalhada do produto pode ser registrado em descrição do produto.',
  }),
  description: z.string().min(1, { message: defaultMessageError }),
  price: z.coerce.number().min(1, { message: defaultMessageError }),
  corsList: z.array(z.string()).min(1, { message: 'Selecione uma Cor' }),
  stockQuantity: z.coerce.number().min(1, { message: defaultMessageError }),
  minimumQuantityStock: z.coerce
    .number()
    .min(1, { message: defaultMessageError }),
  discountPercentage: z.coerce
    .number()
    .min(1, { message: defaultMessageError }),
  placeOfSale: z.nativeEnum(ModeOfSale),
})

const additionalProductCreateSchema = z.object({
  categoryTitle: z.string().min(1),
  technicalProductDetails: z.object({
    width: z.string().min(1, { message: defaultMessageError }),
    height: z.string().min(1, { message: defaultMessageError }),
    weight: z.string().min(1, { message: defaultMessageError }),
    brand: z.string().min(1, { message: defaultMessageError }),
    model: z.string().min(1, { message: defaultMessageError }),
    ram: z.string().min(1, { message: defaultMessageError }),
    rom: z.string().min(1, { message: defaultMessageError }),
    videoResolution: z.string().min(1, { message: defaultMessageError }),
    batteryCapacity: z.string().min(1, { message: defaultMessageError }),
    screenOrWatchFace: z.string().min(1, { message: defaultMessageError }),
    averageBatteryLife: z.string().min(1, { message: defaultMessageError }),
    videoCaptureResolution: z.string().min(1, { message: defaultMessageError }),
    processorBrand: z.string().min(1, { message: defaultMessageError }),
    operatingSystem: z.string().min(1, { message: defaultMessageError }),
  }),
})

export const productCreateSchema =
  additionalProductCreateSchema.merge(baseProductSchema)
