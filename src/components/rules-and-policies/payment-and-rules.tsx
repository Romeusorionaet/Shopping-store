'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

export function PaymentAndPolices() {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="rounded-md p-1 underline duration-700"
      >
        Pagamentos e segurança
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Pagamentos e Segurança</DialogTitle>
        </DialogHeader>

        <Button
          variant="ghost"
          title="Fechar"
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2"
        >
          <X />
        </Button>

        <div>
          <h2 className="font-bold">Cartão de crédito</h2>
          <p>
            Aceitamos todos os principais cartões de crédito: Visa, Mastercard,
            Elo e American Express.
          </p>
        </div>

        <div>
          <h2 className="font-bold">Pix</h2>
          <p>
            Pagamentos em tempo real, disponível a qualquer dia ou hora. O
            pagamento via Pix deverá ser feito em até 30 minutos após a
            finalização do pedido.{' '}
            <span className="text-base_color_negative">(Em planejamento)</span>
          </p>
        </div>

        <div>
          <h2 className="font-bold">Boleto bancário</h2>
          <p>
            Vencimento em 1 dia útil. A data de entrega será alterada devido ao
            tempo de processamento do Boleto.{' '}
            <span className="text-base_color_negative">(Em planejamento)</span>
          </p>
        </div>

        <div>
          <h2 className="font-bold">Sua compra é segura</h2>
          <p>
            Estamos sempre empenhados em proteger sua segurança e privacidade.
            Nosso sistema de pagamento utiliza criptografia para proteger suas
            informações durante a compra. Não compartilhamos os detalhes do seu
            cartão de crédito com vendedores parceiros, nem vendemos suas
            informações.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
