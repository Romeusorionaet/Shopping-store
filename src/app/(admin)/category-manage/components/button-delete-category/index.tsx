'use client'

import { deleteCategory } from '@/actions/delete/category'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'

export function ButtonDeleteCategory({ id }: { id: string }) {
  const { notifyError, notifySuccess } = useNotification()

  const router = useRouter()

  const handleDeleteCategory = async () => {
    const result = await deleteCategory(id)

    const notify = result.success ? notifySuccess : notifyError
    notify({ message: result.message, origin: 'server' })

    router.push('/category-manage/category-listing')
  }

  return (
    <Button variant="destructive" onClick={() => handleDeleteCategory()}>
      Deletar
    </Button>
  )
}
