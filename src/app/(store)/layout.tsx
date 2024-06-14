import { CartArea } from '@/components/cart/cart-area'
import { Header } from '@/components/header'

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}
      <CartArea />
    </div>
  )
}
