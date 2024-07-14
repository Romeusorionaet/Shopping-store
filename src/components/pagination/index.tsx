'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Props {
  sizeList: number
  disableArrowIf: boolean
}

export function Pagination({ sizeList, disableArrowIf }: Props) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const section = searchParams.get('section')
  const page = parseInt(searchParams.get('p') || '1', 10)

  const [currentPage, setCurrentPage] = useState(page)

  const router = useRouter()

  const path = usePathname()

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  const handleChangePage = (direction: string) => {
    let newPage = currentPage
    if (direction === 'next') {
      newPage = currentPage + 1
    } else if (direction === 'previous' && currentPage > 1) {
      newPage = currentPage - 1
    }

    setCurrentPage(newPage)

    if (section) {
      router.push(`${path}?s=${section}&q=${query}&p=${newPage}`)
    }

    router.push(`${path}?q=${query}&p=${newPage}`)
  }

  return (
    <div className="mt-10 w-full pr-4">
      <div className="flex items-center justify-end gap-4">
        <Button
          data-testid="btn_left"
          data-value={currentPage <= 1}
          onClick={() => handleChangePage('previous')}
          className="hover:text-base_color_text_top data-[value=true]:hidden"
        >
          <ChevronLeft />
        </Button>
        <span
          data-value={!disableArrowIf}
          className="font-bold data-[value=true]:hidden"
        >
          {page}
        </span>
        <Button
          data-testid="btn_right"
          data-value={sizeList < 14 || !disableArrowIf}
          onClick={() => handleChangePage('next')}
          className="hover:text-base_color_text_top data-[value=true]:hidden"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
