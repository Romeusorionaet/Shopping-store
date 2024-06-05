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
  const initialPage = parseInt(searchParams.get('p') || '1', 10)

  const [currentPage, setCurrentPage] = useState(initialPage)

  const router = useRouter()

  const path = usePathname()

  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

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
    <div className="flex w-full justify-end gap-4 pr-4">
      <Button
        data-value={currentPage <= 1}
        onClick={() => handleChangePage('previous')}
        className="hover:text-base_color_text_top data-[value=true]:hidden"
      >
        <ChevronLeft />
      </Button>
      <Button
        data-value={sizeList < 14 || !disableArrowIf}
        onClick={() => handleChangePage('next')}
        className="hover:text-base_color_text_top data-[value=true]:hidden"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
