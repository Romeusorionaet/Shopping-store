import { updateOrder } from '@/actions/update/order'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  orderId: string
}

export function OrderDelivered({ orderId }: Props) {
  const navigate = useRouter()

  const handleNotifyOrderDelivered = async () => {
    const orderTracking = 'PRODUCT_DELIVERED_TO_CLIENT'

    const result = await updateOrder({ orderTracking, orderId })
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
