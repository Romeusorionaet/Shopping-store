import { authOptions } from '@/lib/auth'
import { getHistoricOrder } from '@/lib/getData/get-data-historic'
import { getServerSession } from 'next-auth'
import { HistoricItem } from './componets/historic-item'
import { HistoricOrder } from '@prisma/client'

export default async function Historic() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return (
      <div className="flex h-screen justify-center items-center">
        <h1>Sem usuário logado...</h1>
      </div>
    )
  }

  const { props } = await getHistoricOrder(session.user.id)
  const historic: HistoricOrder[] = JSON.parse(props.historic)

  return (
    <div className="pt-28 p-8">
      <HistoricItem historic={historic} />
    </div>
  )
}
