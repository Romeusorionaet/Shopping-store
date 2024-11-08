'use client'

import { deleteProduct } from '@/actions/delete/product'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'

export function ButtonDeleteProduct({ productId }: { productId: string }) {
  const { notifyError, notifySuccess } = useNotification()

  const router = useRouter()

  const handleDeleteProduct = async () => {
    const result = await deleteProduct(productId)

    if (result.success) {
      notifySuccess({ message: result.message, origin: 'server' })
      router.replace('/product-manage/product-listing')
    } else {
      return notifyError({ message: result.message, origin: 'server' })
    }
  }

  return (
    <Button
      variant="destructive"
      type="button"
      onClick={() => handleDeleteProduct()}
    >
      Deletar
    </Button>
  )
}
