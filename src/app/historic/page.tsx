import { authOptions } from '@/lib/auth'
import { getHistoricOrder } from '@/lib/getData/get-data-historic'
import { Separator } from '@radix-ui/react-separator'
import { format } from 'date-fns'
import { getServerSession } from 'next-auth'

export default async function Historic() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <h1>Sem usuário logado</h1>
  }

  const { props } = await getHistoricOrder(session.user.id)

  return (
    <div className="pt-28 p-8">
      {props.historic &&
        props.historic.map((historic) => {
          const totalDiscount =
            Number(historic.basePrice) * (historic.discountPercentage / 100)
          const totalPrice = Number(historic.basePrice) - totalDiscount

          return (
            <div key={historic.id}>
              <p>{historic.name}</p>
              <p>{historic.quantity}</p>
              <p>{historic.status}</p>
              <div className="flex items-center justify-between text-xs">
                <p>Subtotal</p>
                <p>
                  {Number(historic.basePrice).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <Separator className="opacity-20" />

              <div className="flex items-center justify-between text-xs">
                <p>Descontos</p>
                <p>
                  -
                  {totalDiscount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <Separator className="opacity-20" />

              <div className="flex items-center justify-between text-sm font-bold">
                <p>Total</p>
                <p>
                  {totalPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <p>{format(new Date(historic.createdAt), "d/MM/y 'às' HH:mm")}</p>
            </div>
          )
        })}
    </div>
  )
}
