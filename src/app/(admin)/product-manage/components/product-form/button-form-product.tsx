'use client'

import { Button } from '@/components/ui/button'

export function ButtonFormProduct() {
  return (
    <Button
      variant="ghost"
      type="submit"
      form="product-form"
      className="border"
    >
      Enviar dados
    </Button>
  )
}
