import { authOptions } from '@/lib/auth'
import { getHistoricOrder } from '@/lib/getData/get-data-historic'
import { getServerSession } from 'next-auth'
import { HistoricItem } from './componets/historic-item'
import { HistoricOrder } from '@prisma/client'
import { NoUserMessage } from '@/components/no-user-message'

export default async function Historic() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <NoUserMessage />
  }

  const { props } = await getHistoricOrder(session.user.id)
  const historic: HistoricOrder[] = JSON.parse(props.historic)

  return (
    <div className="pt-28">
      <h1 className="mb-20">Seu histórico de produtos comprado</h1>
      <HistoricItem historic={historic} />
    </div>
  )
}
