import { useEffect, useContext } from 'react'
import { io } from 'socket.io-client'
import { UserContext } from '@/providers/user-context'

const socket = io(process.env.NEXT_PUBLIC_API_URL)

export function useSocket() {
  const { profile } = useContext(UserContext)

  useEffect(() => {
    if (profile?.publicId) {
      socket.emit('registerUser', profile.publicId)
    }

    if (process.env.NODE_ENV !== 'production') {
      socket.on('connect', () => {
        console.log(`Connected with ID: ${socket.id}`)
      })

      socket.on('disconnect', () => {
        console.log(`Disconnected from WebSocket`)
      })
    }

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [profile?.publicId])

  return { socket }
}
