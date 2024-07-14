import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  sizeList: boolean
  section: string
  onClick: () => void
}

export function ArrowControlLeft({ sizeList, onClick, section }: Props) {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full items-center justify-center p-2 max-md:hidden">
      <button
        data-testid={`arrow_control_left_${section}`}
        data-list={sizeList}
        onClick={onClick}
        className="data-[list=true]:hidden"
      >
        <ChevronLeft
          size={60}
          className="rounded-full bg-base_color_dark/20 text-white duration-700 hover:bg-base_color_dark"
        />
      </button>
    </div>
  )
}

export function ArrowControlRight({ sizeList, onClick, section }: Props) {
  return (
    <div className="absolute right-0 top-0 z-20 flex h-full items-center justify-center p-2 max-md:hidden">
      <button
        data-testid={`arrow_control_right_${section}`}
        data-list={sizeList}
        onClick={onClick}
        className="data-[list=true]:hidden"
      >
        <ChevronRight
          size={60}
          className="rounded-full bg-base_color_dark/20 text-white duration-700 hover:bg-base_color_dark"
        />
      </button>
    </div>
  )
}
