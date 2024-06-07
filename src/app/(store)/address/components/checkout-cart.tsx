import { useSession } from 'next-auth/react'
import { useCartStore } from '@/providers/zustand-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNotification } from '@/hooks/use-notifications'
import { createCheckout } from '@/actions/checkout'

interface Props {
  userHasAddress: boolean
}

export function CheckoutCart({ userHasAddress }: Props) {
  const cart = useCartStore((state) => state.cart)
  const { data } = useSession()
  const { notifyWarning, notifyError } = useNotification()

  const navigate = useRouter()

  if (!data) {
    return (
      <div className="mt-10">
        <ClipLoader color="#000" loading={!data} size={35} />
      </div>
    )
  }

  const organizeOrderProducts = () => {
    const orderProducts = []

    for (const product of cart) {
      const orderProduct = {
        productId: product.id,
        title: product.title,
        imgUrl: product.imgUrlList[0],
        discountPercentage: product.discountPercentage,
        basePrice: product.price,
        quantity: product.quantity,
        description: product.description,
        colorList: product.corsList ?? '',
      }

      orderProducts.push(orderProduct)
    }

    return { orderProducts }
  }

  const handleFinishPurchaseClick = async () => {
    try {
      if (cart.length === 0) {
        notifyWarning('Carrinho vazio')

        navigate.push('/')

        return
      }

      const { orderProducts } = organizeOrderProducts()

      const { initPointUrl, error } = await createCheckout(orderProducts)

      if (error) {
        notifyError(error)
      }

      if (initPointUrl) {
        window.open(initPointUrl.checkoutUrl, '_blank')
      }
    } catch (err) {
      notifyError(
        'Houve um problema na criação da compra. Reporte esse erro e tente novamente mais tarde.',
      )
    }
  }

  return (
    <Button
      data-address={userHasAddress}
      disabled={!userHasAddress}
      className="mt-8 uppercase hover:text-base_color_text_top data-[address=false]:cursor-not-allowed data-[address=false]:bg-base_color_dark/10"
      onClick={handleFinishPurchaseClick}
    >
      Finalizar compra
    </Button>
  )
}
