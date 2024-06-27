'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSocket } from '@/hooks/use-socket'
import { NotificationProps } from '@/core/@types/api-store'
import { fetchDataBuyerNotifications } from '@/actions/get/buyer/fetch-data-buyer-notifications'

interface NotificationContextType {
  unreadNotifications: NotificationProps[]
  oldNotificationsRead: NotificationProps[]
  sizeNotification: number
  handleUpdateListNotification: (notificationId: string) => void
}

interface NotificationContextProps {
  children: ReactNode
}

export const NotificationContext = createContext({} as NotificationContextType)

export function NotificationContextProvider({
  children,
}: NotificationContextProps) {
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationProps[]
  >([])
  const [oldNotificationsRead, setOldNotificationsRead] = useState<
    NotificationProps[]
  >([])

  const { socket } = useSocket()

  const sizeNotification = unreadNotifications.length

  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchDataBuyerNotifications(),
  })

  const handleUpdateListNotification = (notificationId: string) => {
    setUnreadNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId),
    )
  }

  useEffect(() => {
    const handleNewNotification = (notification: NotificationProps) => {
      setUnreadNotifications((prev) => [...prev, notification])
    }

    const notificationTypes = ['message']

    notificationTypes.forEach((type) => {
      socket.on(type, handleNewNotification)
    })

    return () => {
      notificationTypes.forEach((type) => {
        socket.off(type, handleNewNotification)
      })
    }
  })

  useEffect(() => {
    const handleOldNotifications = () => {
      const notificationsData: NotificationProps[] = JSON.parse(
        data?.props.notifications || '[]',
      )

      const unreadNotifications = notificationsData.filter(
        (item) => item.readAt === false,
      )

      if (unreadNotifications.length > 0) {
        setUnreadNotifications(unreadNotifications)
      }

      const notificationsRead = notificationsData.filter(
        (item) => item.readAt !== false,
      )

      if (notificationsRead.length > 0) {
        setOldNotificationsRead(notificationsRead)
      }
    }

    handleOldNotifications()
  }, [data])

  return (
    <NotificationContext.Provider
      value={{
        unreadNotifications,
        sizeNotification,
        handleUpdateListNotification,
        oldNotificationsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
