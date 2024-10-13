'use client'

interface Product {
  name?: string
  accountable: string
  createdAt: string
  updatedAt: string
}

interface Props {
  data: Product[]
}

export function GraphicTimelineProducts({ data }: Props) {
  const timelineEntries = data.flatMap((product) => [
    {
      date: new Date(product.createdAt),
      name: product.name,
      accountable: product.accountable,
      status: 'criado',
    },
    {
      date: new Date(product.updatedAt),
      name: product.name,
      accountable: product.accountable,
      status: 'atualizado',
    },
  ])

  timelineEntries.sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="w-full p-4">
      <ul className="mt-4 space-y-2">
        {timelineEntries.map((entry, index) => (
          <li key={index} className="flex items-center gap-4">
            <span className="text-gray-600">
              {entry.date.toLocaleString('pt-BR')} ── {entry.status}:{' '}
              {entry.name}
            </span>
            <span> - {entry.accountable}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
