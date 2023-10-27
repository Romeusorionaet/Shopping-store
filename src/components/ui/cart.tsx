import { ShoppingCartIcon } from 'lucide-react'
import { Separator } from './separator'
import { Button } from './button'
import { CartItem } from './cart-item'
import { loadStripe } from '@stripe/stripe-js'
import { useCartStore } from '@/providers/zustand-store'
import { calculateCartAllValues } from '@/utils/calculate-cart-all-values'
import { createCheckout } from '@/actions/checkout'
import { createOrder } from '@/actions/order'
import { useSession } from 'next-auth/react'

export function Cart() {
  const { cart } = useCartStore()
  const { subtotal, totalDiscount, total } = calculateCartAllValues(cart)
  const { data } = useSession()

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      // fazer redirecionamento para tela de login
      console.log('sem user logado')
      return
    }
    const order = await createOrder(cart, (data?.user as any).id)

    const checkout = await createCheckout(cart, order.id)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    if (stripe) {
      stripe
        .redirectToCheckout({
          sessionId: checkout.id,
        })
        .then(function (result) {
          if (result.error) {
            console.error(result.error)
          }
        })
    }
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase">
        <ShoppingCartIcon size={16} />
        Carrinho
      </div>

      {/* RENDERIZAR OS PRODUTOS */}
      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <div className="flex h-full flex-col gap-8">
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
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  )
}
