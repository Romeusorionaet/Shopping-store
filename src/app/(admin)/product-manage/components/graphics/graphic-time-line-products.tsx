'use client'

import Link from 'next/link'

interface Product {
  name: string
  createdAt: string
  updatedAt: string
}

interface Props {
  data: Product[]
}

export function GraphicTimelineProducts({ data }: Props) {
  const timelineEntries = data.flatMap((product) => [
    { date: new Date(product.createdAt), name: product.name, status: 'criado' },
    {
      date: new Date(product.updatedAt),
      name: product.name,
      status: 'atualizado',
    },
  ])

  timelineEntries.sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="w-full p-4">
      <ul className="mt-4 space-y-2">
        {timelineEntries.map((entry, index) => (
          <Link href="/" key={index}>
            <li className="flex w-[30rem] items-center px-1 duration-300 hover:bg-slate-200">
              <span className="text-gray-600">
                {entry.date.toLocaleString('pt-BR')} ── {entry.status}:{' '}
                {entry.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
