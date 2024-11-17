'use client'

import { Button } from '@/components/ui/button'
import { CategoryTechnicalDetailsProps } from '@/core/@types/api-store'
import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ActivityStatusTranslations } from '@/utils/activity-status-translations'

interface Props {
  data: CategoryTechnicalDetailsProps[]
}

export function GraphicTimelineUpdates({ data }: Props) {
  const [selectedEntry, setSelectedEntry] =
    useState<CategoryTechnicalDetailsProps | null>()

  const handleEntryClick = (entry: CategoryTechnicalDetailsProps) => {
    setSelectedEntry(entry)
  }

  const closeModal = () => {
    setSelectedEntry(null)
  }

  return (
    <div className="scrollbar w-full overflow-auto border-y border-base_color_dark/20 p-4">
      <ul>
        {data.map((entry, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-center gap-4 rounded p-2 hover:bg-gray-100"
            onClick={() => handleEntryClick(entry)}
          >
            <p>
              {format(new Date(entry.dateTimeIso), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
              <span className="text-gray-600">
                {' '}
                ── {ActivityStatusTranslations[entry.status]}:
              </span>
            </p>
            <p className="lowercase">
              {entry.staff.user.name} <span>({entry.staff.role})</span>
            </p>
          </li>
        ))}
      </ul>

      {selectedEntry && (
        <div className="fixed inset-0 left-12 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] rounded bg-white p-4 shadow-md">
            <h3 className="text-lg font-semibold">Detalhes do Commit</h3>
            <p>
              <strong>Data:</strong>{' '}
              {format(
                new Date(selectedEntry.dateTimeIso),
                "dd/MM/yyyy 'às' HH:mm",
                {
                  locale: ptBR,
                },
              )}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {ActivityStatusTranslations[selectedEntry.status]}
            </p>
            <p className="lowercase">
              <strong>Responsável:</strong> {selectedEntry.staff.user.name}{' '}
              <span>({selectedEntry.staff.role})</span>
            </p>
            <p>
              <strong>Email:</strong> {selectedEntry.staff.user.email}
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
