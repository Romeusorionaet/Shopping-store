import { CartArea } from '../cart/cart-area'
import { NotificationArea } from '../notification/notification-area'

export function Footer() {
  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-between border-t-2 border-slate-300 bg-white px-2">
      <NotificationArea />
      <CartArea />
    </div>
  )
}
