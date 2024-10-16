'use client'

import { FormError } from '@/components/form/form-error'
import { Input } from '@/components/ui/input'
import { CategoryProps } from '@/core/@types/api-store'
import { useNotification } from '@/hooks/use-notifications'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { categoryCreateSchema } from '@/schemas/category-schema'
import { UploadImage } from './upload-image'
import { createCategory } from '@/actions/register/category'
import { updateCategory } from '@/actions/update/category'
import { Button } from '@/components/ui/button'

export interface ImageCategoryProps {
  name: string
  url: string
}

interface CategoryFormProps {
  category?: CategoryProps
}

export type CategoryFormData = z.infer<typeof categoryCreateSchema>

export function CategoryForm({ category }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryCreateSchema),
  })
  const { notifyError, notifySuccess } = useNotification()
  const [imageCategory, setImageCategory] = useState<ImageCategoryProps>({
    name: category?.title ?? '',
    url: category?.imgUrl ?? '',
  })

  const pathname = usePathname()

  const router = useRouter()

  const isRegisterPath = pathname === '/category-manage/register-category'

  const hasValidImageCount = !!imageCategory.url

  const handleProductForm = async (categoryData: CategoryFormData) => {
    if (!hasValidImageCount) {
      const message = 'A categoria deve ter 1 imagem.'

      return notifyError({
        message,
        origin: 'server',
      })
    }

    const dataUpdate = {
      ...categoryData,
      id: category?.id,
      imgUrl: imageCategory.url,
    }

    const dataCreate = {
      ...categoryData,
      imgUrl: imageCategory.url,
    }

    const data = isRegisterPath ? dataCreate : dataUpdate

    const categoryAction = isRegisterPath ? createCategory : updateCategory

    const result = await categoryAction({ category: data })

    const notify = result.success ? notifySuccess : notifyError
    notify({ message: result.message, origin: 'server' })

    router.push('/category-manage/category-listing')
  }

  return (
    <form
      id="category-form"
      onSubmit={handleSubmit(handleProductForm)}
      className="flex flex-col gap-4 space-y-10"
    >
      <UploadImage
        imageCategory={imageCategory}
        setImageCategory={setImageCategory}
      />
      <label className="space-y-2">
        <span>Nome</span>
        <Input
          type="text"
          defaultValue={category?.title}
          className="bg-transparent"
          {...register('title')}
        />
        <FormError errors={errors.title?.message} />
      </label>

      <Button
        variant="ghost"
        type="submit"
        form="category-form"
        className="border"
      >
        {isRegisterPath ? 'Criar' : 'Atualizar'}
      </Button>
    </form>
  )
}
