'use client'

import { updateOrder } from '@/actions/update/order'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OrderStatusTracking } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  orderId: string
}

export function InsertTrackingCode({ orderId }: Props) {
  const [trackingCode, setTrackingCode] = useState('')

  const navigate = useRouter()

  const handleUpdateTrackingCode = async () => {
    if (!trackingCode) {
      alert('Insira o código.')
      return
    }

    try {
      const result = await updateOrder({ trackingCode, orderId })

      alert(result.message)

      setTrackingCode('')

      navigate.push('/control-adm')
      navigate.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancelOrder = async () => {
    const { CANCELED } = OrderStatusTracking

    try {
      await updateOrder({ orderTracking: CANCELED, orderId })

      alert('Pedido cancelado')

      navigate.push('/control-adm')
      navigate.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-2">
      <p>Inserir código de rastreio</p>
      <Input
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
      />

      <p className="text-sm text-white">
        Se este pedido foi reembolsado, clique no botão de{' '}
        <strong>Reembolso</strong>.
      </p>

      <div className="flex justify-between">
        <Button
          onClick={handleUpdateTrackingCode}
          className="text-base_color_dark"
        >
          Enviar
        </Button>

        <Button onClick={handleCancelOrder} variant="destructive">
          Reembolso
        </Button>
      </div>
    </div>
  )
}
