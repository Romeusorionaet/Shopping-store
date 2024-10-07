'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function ButtonFormProduct() {
  const pathname = usePathname()

  const isRegisterPath = pathname === '/product-manage/register-product'

  return (
    <Button
      variant="ghost"
      type="submit"
      form="product-form"
      className="border"
    >
      {isRegisterPath ? 'Criar produto' : 'Atualizar produto'}
    </Button>
  )
}
