import { Bell } from 'lucide-react'

interface Props {
  sizeNotification: number
  username: string
}

export function BellNotification({ sizeNotification, username }: Props) {
  return (
    <button className="rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-base_one_reference_header">
      <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-base_one_reference_header text-base_color_text_top duration-700">
        {username && (
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
            <span className="text-xs">{sizeNotification}</span>
          </div>
        )}
        <Bell size={30} />
      </div>
    </button>
  )
}
