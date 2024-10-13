'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface Update {
  update: string
  commit: string
  accountable: string
}

interface Entry {
  accountable: string
  commit: string
  createdAt: string
}

interface TimelineEntry {
  date: Date
  status: string
  accountable: string
  commit?: string
}

interface Props {
  data: (Update[] | Entry)[]
}

export function GraphicTimelineUpdates({ data }: Props) {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null)

  const handleUpdatesArray = (updates: Update[]): TimelineEntry[] =>
    updates.map(({ update, accountable, commit }) => ({
      date: new Date(update),
      status: 'atualizado',
      accountable,
      commit,
    }))

  const handleProductObject = (entry: Entry): TimelineEntry[] => [
    {
      date: new Date(entry.createdAt),
      status: 'criado',
      accountable: entry.accountable,
      commit: entry.commit,
    },
  ]

  const timelineEntries: TimelineEntry[] = data.flatMap((item) =>
    Array.isArray(item) ? handleUpdatesArray(item) : handleProductObject(item),
  )

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
              {entry.date.toLocaleString('pt-BR')} ── {entry.status}:
            </span>
            <span> {entry.accountable}</span>
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
              className="mt-10"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
