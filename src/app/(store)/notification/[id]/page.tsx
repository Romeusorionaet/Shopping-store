import { getDataBuyerNotification } from '@/actions/get/buyer/get-data-buyer-notification'
import { NotificationProps } from '@/core/@types/api-store'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, Eye } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: {
    id: string
  }
}

export default async function Notification({ params }: Props) {
  const { id } = params

  const { props } = await getDataBuyerNotification(id)

  if (!props?.notification) {
    return <p className="pt-28 text-center">Notificação não foi encontrado.</p>
  }

  const notification: NotificationProps = JSON.parse(props.notification || '{}')

  return (
    <main className="mx-auto max-w-[800px] px-4 pt-20 md:pt-32">
      <h1 className="font-bold">Informações</h1>

      <article className="mt-4 bg-zinc-100 p-2">
        <header className="space-y-4">
          <div className="flex gap-2">
            <Clock size={16} />
            <span className="text-xs">
              {notification.createdAt &&
                formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
            </span>
          </div>

          <h2 className="mb-4 font-semibold">{notification.title}</h2>
        </header>

        <div className="my-4">
          <p>{notification.content}</p>

          <Link href="/orders" className="m-4 inline-block underline">
            Acessar área de pedidos
          </Link>
        </div>

        <footer className="flex gap-2">
          <Eye size={16} />
          <span className="text-xs">
            {notification.readAt &&
              formatDistanceToNow(new Date(notification.readAt.toString()), {
                addSuffix: true,
                locale: ptBR,
              })}
          </span>
        </footer>
      </article>
    </main>
  )
}
