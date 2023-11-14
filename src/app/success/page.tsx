'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Success() {
  const navigate = useRouter()

  const handleNavigateToOrders = () => {
    navigate.push('/orders')
  }

  return (
    <div className="pt-28">
      <h1 className="text-center">Success page</h1>

      <Button
        onClick={handleNavigateToOrders}
        className="bg-green-500 p-2 rounded-md sm:w-56"
      >
        Ver pedidos
      </Button>
    </div>
  )
}
