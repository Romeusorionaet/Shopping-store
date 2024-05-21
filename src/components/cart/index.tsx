import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useCartStore } from '@/providers/zustand-store'
import { calculateCartAllValues } from '@/utils/calculate-cart-all-values'
import { useSession } from 'next-auth/react'
import { CartItem } from './cart-item'
import { NoUserMessage } from '../no-user-message'

interface Props {
  handleNavigateTo: (route: string) => void
}

export function Cart({ handleNavigateTo }: Props) {
  const { cart } = useCartStore()
  const { subtotal, totalDiscount, total } = calculateCartAllValues(cart)
  const { data } = useSession()
  const user = data?.user

  if (!user) {
    return <NoUserMessage />
  }

  const handleNavigateToAddressPage = () => {
    handleNavigateTo('/address')
  }

  return (
    <div className="flex h-full flex-col gap-6 pb-4">
      <div className="mt-10 flex h-full flex-col gap-5 overflow-y-auto">
        <div className="flex h-full flex-col gap-8">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center font-semibold">Carrinho vazio.</p>
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

          <Button
            variant="outline"
            className="w-full gap-4 font-semibold duration-700 hover:bg-base_reference_card hover:text-primary"
            onClick={handleNavigateToAddressPage}
          >
            Dados de entrega
          </Button>
        </div>
      )}
    </div>
  )
}
