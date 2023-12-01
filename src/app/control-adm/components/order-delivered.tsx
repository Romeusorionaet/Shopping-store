import { updateOrder } from '@/actions/update/order'
import { Button } from '@/components/ui/button'
import { OrderStatusTracking } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Props {
  orderId: string
}

export function OrderDelivered({ orderId }: Props) {
  const navigate = useRouter()

  const handleNotifyOrderDelivered = async () => {
    const { PRODUCT_DELIVERED_TO_CLIENT } = OrderStatusTracking

    const result = await updateOrder({
      orderTracking: PRODUCT_DELIVERED_TO_CLIENT,
      orderId,
    })
    alert(result.message)

    navigate.push('/control-adm')
    navigate.refresh()
  }

  return (
    <Button onClick={handleNotifyOrderDelivered} className="text-zinc-950">
      O destinatário recebeu este produto
    </Button>
  )
}
