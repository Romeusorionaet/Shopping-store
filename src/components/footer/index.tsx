import { Phone } from 'lucide-react'
import { CartArea } from '../cart/cart-area'
import { NotificationsArea } from '../notification/notifications-area'

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-between border-t-2 border-slate-300 bg-white px-2">
      <div className="flex items-center justify-center gap-8">
        <NotificationsArea />
        <Phone size={28} />
      </div>
      <CartArea />
    </footer>
  )
}
