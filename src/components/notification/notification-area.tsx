import { Bell, Phone } from 'lucide-react'
import { Button } from '../ui/button'

export function NotificationArea() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-base_one_reference_header text-base_color_text_top duration-700">
        <Bell size={30} />
        {/* {conditionForShowNotification && (
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
            <p>{clientRendered && notification.length}</p>
          </div>
        )} */}
      </div>
      <Button
        variant="ghost"
        className="hover:bg-transparent hover:text-base_color_dark"
      >
        <Phone className="hover:scale-105" size={30} />
      </Button>
    </div>
  )
}
