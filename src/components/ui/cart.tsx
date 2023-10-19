import { ShoppingCartIcon } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { computeProductTotalPrice } from '@/ultis/compute-product-to-total-price'

const Cart = () => {
  const { products } = useContext(CartContext)

  return (
    <div className="flex flex-col gap-8">
      <div className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase">
        <ShoppingCartIcon size={16} />
        Catálogo
      </div>

      {/* RENDERIZAR OS PRODUTOS */}
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem
            key={product.id}
            product={computeProductTotalPrice(product as any) as any}
          />
        ))}
      </div>
    </div>
  )
}

export default Cart
