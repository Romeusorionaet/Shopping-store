import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { Server, Store } from 'lucide-react'

interface NotifyProps {
  message: string
  origin: 'server' | 'client'
}

export function useNotification() {
  const createToastContent = (message: string, origin: 'server' | 'client') => (
    <div className="flex flex-wrap items-center gap-2">
      {origin === 'client' && <Store size={18} />}
      {origin === 'server' && <Server size={18} />}
      <span>{message}</span>
    </div>
  )

  const notifyError = ({ message, origin }: NotifyProps) => {
    toast.error(createToastContent(message, origin))
  }

  const notifySuccess = ({ message, origin }: NotifyProps) => {
    toast.success(createToastContent(message, origin))
  }

  const notifyWarning = ({ message, origin }: NotifyProps) => {
    toast.warning(createToastContent(message, origin))
  }

  return {
    notifyError,
    notifySuccess,
    notifyWarning,
  }
}
