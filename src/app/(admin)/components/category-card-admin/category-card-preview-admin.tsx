import { BaseUrl } from '@/constants/base-url'
import Image from 'next/image'

interface Props {
  imgURL: string
  title: string
}

export function CategoryCardPreviewAdmin({ imgURL, title }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-16 w-16 md:h-20 md:w-20">
        <Image
          height={400}
          width={400}
          src={`${BaseUrl.IMG}/${imgURL}`}
          alt="product image view"
          className="h-full w-full border border-slate-300 object-fill"
        />
      </div>
      <p className="font-bold">{title}</p>
    </div>
  )
}
