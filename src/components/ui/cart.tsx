import { ShoppingCartIcon } from 'lucide-react'
import { Separator } from './separator'
import { Button } from './button'
import { CartItem } from './cart-item'
import { useCartStore } from '@/providers/zustand-store'
import { calculateCartAllValues } from '@/utils/calculate-cart-all-values'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function Cart() {
  const { cart } = useCartStore()
  const { subtotal, totalDiscount, total } = calculateCartAllValues(cart)
  const navigate = useRouter()
  const { data } = useSession()
  const hasUser = data?.user

  const handleNavigateToAddressPage = () => {
    if (!hasUser) {
      alert('faça login na sua conta')
      navigate.push('/')
    } else {
      navigate.push('/address')
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
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          <Button onClick={handleNavigateToAddressPage}>
            Dados de entrega
          </Button>
        </div>
      )}
    </div>
  )
}
