'use client'

import { updateOrder } from '@/actions/update/order'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
      <Button onClick={handleUpdateTrackingCode} className="text-zinc-950">
        Enviar
      </Button>
    </div>
  )
}
