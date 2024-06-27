import { useCartStore } from '@/providers/zustand-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNotification } from '@/hooks/use-notifications'
import { createCheckout } from '@/actions/checkout'
import { UserContext } from '@/providers/user-context'
import { useContext } from 'react'

interface Props {
  userHasAddress: boolean
}

export function CheckoutCart({ userHasAddress }: Props) {
  const cart = useCartStore((state) => state.cart)
  const { profile } = useContext(UserContext)
  const { notifyWarning, notifyError } = useNotification()

  const navigate = useRouter()

  if (!profile.username) {
    return (
      <div className="mt-10">
        <ClipLoader color="#000" loading={!profile.username} size={35} />
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
        notifyWarning({ message: 'Carrinho vazio', origin: 'client' })

        navigate.push('/')

        return
      }

      const { orderProducts } = organizeOrderProducts()

      const { initPointUrl, error } = await createCheckout(orderProducts)

      if (error) {
        notifyError({ message: error, origin: 'server' })
      }

      if (initPointUrl) {
        window.open(initPointUrl.checkoutUrl, '_blank')
      }
    } catch (err) {
      notifyError({
        message:
          'Houve um problema na criação da compra. Reporte esse erro e tente novamente mais tarde',
        origin: 'server',
      })
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
