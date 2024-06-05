'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Coins, CreditCard, X } from 'lucide-react'

interface Props {
  totalPrice: number
}

export function PaymentAndOptions({ totalPrice }: Props) {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

  const [creditCard, setCreditCard] = useState(true)
  const [pix, setPix] = useState(false)

  const maxInstallments = 10

  const handleHiddenOptions = (option: string) => {
    if (option === 'creditCard') {
      setPix(false)
      setCreditCard(true)
    } else {
      setCreditCard(false)
      setPix(true)
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="rounded-md p-1 underline duration-700"
      >
        Ver mais opções de pagamento
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Opções de pagamento</DialogTitle>
        </DialogHeader>

        <Button
          variant="ghost"
          title="Fechar"
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2"
        >
          <X />
        </Button>

        <Button
          variant="ghost"
          data-value={creditCard}
          onClick={() => handleHiddenOptions('creditCard')}
          className="flex items-center gap-4 uppercase duration-700 hover:text-base_color_text_top data-[value=true]:border"
        >
          <CreditCard /> Cartão de Crédito
        </Button>

        <Button
          variant="ghost"
          data-value={pix}
          onClick={() => handleHiddenOptions('pix')}
          className="flex items-center gap-4 uppercase duration-700 hover:text-base_color_text_top data-[value=true]:border"
        >
          <Coins /> Pix
        </Button>

        <div
          data-value={creditCard}
          className="space-y-2 data-[value=false]:hidden"
        >
          {Array.from({ length: maxInstallments }, (_, i) => i + 1).map(
            (installment) => (
              <div className="flex justify-between" key={installment}>
                <p>{installment}x sem juros</p>
                <span className="text-sm md:text-base">
                  R$ {(totalPrice / installment).toFixed(2)}
                </span>
              </div>
            ),
          )}

          <div className="flex justify-between">
            <p>11x com juros (1.30% a.m)</p>

            <span className="text-sm md:text-base">
              R$ {((totalPrice / 11) * 1.013).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <p>12x com juros (2.50% a.m)</p>

            <span className="text-sm md:text-base">
              R$ {((totalPrice / 12) * 1.025).toFixed(2)}
            </span>
          </div>
        </div>

        <div data-value={pix} className="data-[value=false]:hidden">
          <p>
            Estamos aprimorando nossa plataforma para incluir a opção de
            pagamento via Pix. No momento, aceitamos apenas pagamentos com
            cartão de crédito. Agradecemos a sua compreensão.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
