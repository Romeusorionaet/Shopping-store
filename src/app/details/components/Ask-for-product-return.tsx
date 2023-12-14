'use client'

import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/use-notifications'
import { useState } from 'react'

interface Props {
  productName: string
}

export function AskForProductReturn({ productName }: Props) {
  const [message, setMessage] = useState(
    `Olá, tenho interesse no produto ${productName}`,
  )
  const { notifyWarning } = useNotification()

  const handleSendMenssage = () => {
    if (!message) {
      notifyWarning('Escreva algo')
      return
    }

    const whatsApp = '55084981127596'
    const userMessage =
      `Olá, tenho interesse no produto ${productName}.\n` + `${message}\n`

    const url = `https://wa.me/${whatsApp}?text=${encodeURIComponent(
      userMessage,
    )}`

    if (url) {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="space-y-2">
      <textarea
        defaultValue={`Olá, tenho interesse no produto ${productName}`}
        onChange={(e) => setMessage(e.target.value)}
        className="resize-none w-full border border-white/20 p-2 rounded-md"
      ></textarea>
      <Button onClick={handleSendMenssage}>
        Pedir retorno do produto ao estoque
      </Button>
    </div>
  )
}
