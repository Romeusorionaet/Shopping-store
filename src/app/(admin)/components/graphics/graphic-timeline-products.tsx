'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface Product {
  name?: string
  accountable: string
  createdAt: string
  updatedAt: string
  commit: string
}

interface TimelineEntry {
  date: Date
  name?: string
  accountable: string
  status: string
  commit?: string
}

interface Props {
  data: Product[]
}

export function GraphicTimelineProducts({ data }: Props) {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null)

  const timelineEntries: TimelineEntry[] = data.flatMap((product) => [
    {
      date: new Date(product.createdAt),
      name: product.name,
      accountable: product.accountable,
      status: 'criado',
      commit: product.commit,
    },
    {
      date: new Date(product.updatedAt),
      name: product.name,
      accountable: product.accountable,
      status: 'atualizado',
      commit: product.commit,
    },
  ])

  timelineEntries.sort((a, b) => b.date.getTime() - a.date.getTime())

  const handleEntryClick = (entry: TimelineEntry) => {
    setSelectedEntry(entry)
  }

  const closeModal = () => {
    setSelectedEntry(null)
  }

  return (
    <div className="scrollbar w-full overflow-auto border-y border-base_color_dark/20 p-4">
      <ul>
        {timelineEntries.map((entry, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-center gap-4 rounded p-2 hover:bg-gray-100"
            onClick={() => handleEntryClick(entry)}
          >
            <span className="text-gray-600">
              {entry.date.toLocaleString('pt-BR')} ── {entry.status}:{' '}
              {entry.name}
            </span>
            <span> - {entry.accountable}</span>
          </li>
        ))}
      </ul>

      {selectedEntry && (
        <div className="fixed inset-0 left-12 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] rounded bg-white p-4 shadow-md">
            <h3 className="text-lg font-semibold">Detalhes do Commit</h3>
            <p>
              <strong>Data:</strong>{' '}
              {selectedEntry.date.toLocaleString('pt-BR')}
            </p>
            <p>
              <strong>Status:</strong> {selectedEntry.status}
            </p>
            <p>
              <strong>Produto:</strong> {selectedEntry.name}
            </p>
            <p>
              <strong>Responsável:</strong> {selectedEntry.accountable}
            </p>
            {selectedEntry.commit && (
              <p>
                <strong>Commit:</strong> {selectedEntry.commit}
              </p>
            )}
            <Button
              variant="destructive"
              onClick={closeModal}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
