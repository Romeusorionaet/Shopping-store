import { OrderProducts } from './area-orders-of-clients'
import { ProductManage } from './product-manage'

interface Props {
  ordersProducts: OrderProducts[]
}

export function OrderProducts({ ordersProducts }: Props) {
  return (
    <div>
      {ordersProducts.map((orderProduct) => {
        return (
          <div key={orderProduct.id} className="py-2">
            <ProductManage product={orderProduct.product} />
          </div>
        )
      })}
    </div>
  )
}
