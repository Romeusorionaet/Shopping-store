'use client'

import { AlertCircle, Bell } from 'lucide-react'
import { useContext, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Link from 'next/link'
import { NotificationContext } from '@/providers/notification-context'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Checkbox } from '../ui/checkbox'
import { UserContext } from '@/providers/user-context'

export function NotificationsPreview() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [notificationState, setNotificationState] = useState(false)
  const {
    unreadNotifications,
    sizeNotification,
    handleUpdateListNotification,
    oldNotificationsRead,
  } = useContext(NotificationContext)
  const { profile } = useContext(UserContext)

  const handleReadNotification = (notificationId: string) => {
    handleUpdateListNotification(notificationId)
    setIsCartOpen(false)
  }

  const handleNotificationStateChange = () => {
    if (!notificationState) {
      setNotificationState(true)
    } else {
      setNotificationState(false)
    }
  }

  const notifications = !notificationState
    ? unreadNotifications
    : oldNotificationsRead

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => setIsCartOpen(open)}>
      <SheetTrigger asChild>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-base_one_reference_header">
            <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-base_one_reference_header text-base_color_text_top duration-700">
              {profile.username && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                  <span className="text-xs">{sizeNotification}</span>
                </div>
              )}
              <Bell size={30} />
            </div>
          </button>
        </div>
      </SheetTrigger>

      <SheetContent className="bg-base_color_text_top text-foreground">
        <h2 className="mb-2 font-bold">Notificações</h2>

        <label className="flex items-center gap-4">
          <Checkbox
            onClick={handleNotificationStateChange}
            checked={notificationState}
          />
          Ver antigas
        </label>

        <div className="scrollbar mt-8 flex h-full flex-col gap-4 overflow-auto border-t pb-28 pr-1 pt-2">
          {notifications &&
            notifications.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex w-full flex-col items-end gap-2 rounded-md bg-zinc-100 p-1"
                >
                  <div className="flex h-12 items-center gap-2">
                    {!item.readAt && (
                      <div className="relative">
                        <AlertCircle />
                        <div className="absolute bottom-0 left-0 h-2 w-2 rounded-full bg-red-500" />
                      </div>
                    )}

                    <Link
                      onClick={() => handleReadNotification(item.id)}
                      href={`/notification/${item.id}`}
                      className="line-clamp-2 underline"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <div className="pr-1 text-xs">
                    <span>
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
