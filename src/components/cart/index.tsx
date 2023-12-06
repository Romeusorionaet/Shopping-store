import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useCartStore } from '@/providers/zustand-store'
import { calculateCartAllValues } from '@/utils/calculate-cart-all-values'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CartItem } from './cart-item'
import { NoUserMessage } from '../no-user-message'
import { ShippingCalculatorAccordion } from '../shipping-calculator-accordion'

export function Cart() {
  const { cart } = useCartStore()
  const { subtotal, totalDiscount, total } = calculateCartAllValues(cart)
  const navigate = useRouter()
  const { data } = useSession()
  const user = data?.user

  if (!user) {
    return <NoUserMessage />
  }

  const handleNavigateToAddressPage = () => {
    if (!user) {
      alert('faça login na sua conta')
      navigate.push('/')
    } else {
      navigate.push('/address')
    }
  }

  return (
    <div className="flex h-full flex-col gap-6 pb-2">
      <div className="flex h-full flex-col gap-5 overflow-y-auto mt-10">
        <div className="flex h-full flex-col gap-8">
          <ShippingCalculatorAccordion />

          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center font-semibold">
              Carrinho vazio. Vamos fazer compras?
            </p>
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator className="opacity-20" />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>
              {subtotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <Separator className="opacity-20" />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>
              -
              {totalDiscount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <Separator className="opacity-20" />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <Button onClick={handleNavigateToAddressPage}>
            Dados de entrega
          </Button>
        </div>
      )}
    </div>
  )
}
