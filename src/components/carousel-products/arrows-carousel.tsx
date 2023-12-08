import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  sizeList: boolean
  onClick: () => void
}

export function ArrowControlLeft({ sizeList, onClick }: Props) {
  return (
    <div className="absolute left-0 top-0 h-full z-20 flex justify-center items-center p-2 max-md:hidden">
      <button
        data-list={sizeList}
        onClick={onClick}
        className="data-[list=true]:hidden"
      >
        <ChevronLeft
          size={60}
          className="bg-base_color_dark/20 hover:bg-base_color_dark duration-700 text-white rounded-full"
        />
      </button>
    </div>
  )
}

export function ArrowControlRight({ sizeList, onClick }: Props) {
  return (
    <div className="absolute right-0 top-0 h-full z-20 flex justify-center items-center p-2 max-md:hidden">
      <button
        data-list={sizeList}
        onClick={onClick}
        className="data-[list=true]:hidden"
      >
        <ChevronRight
          size={60}
          className="bg-base_color_dark/20 hover:bg-base_color_dark duration-700 text-white rounded-full"
        />
      </button>
    </div>
  )
}
