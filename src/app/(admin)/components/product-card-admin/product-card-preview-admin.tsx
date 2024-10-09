import Image from 'next/image'

export function ProductCardPreviewAdmin() {
  return (
    <div className="flex h-24 w-28 flex-col justify-center gap-1 rounded-lg md:h-28 md:w-44">
      <div className="flex gap-1">
        <div className="h-16 w-16 md:h-20 md:w-20">
          <Image
            height={400}
            width={400}
            src="/img/banner-2.png"
            alt="product image view"
            className="h-full w-full border border-slate-300 object-fill"
          />
        </div>
        <div className="space-y-2 font-thin max-md:text-xs">
          <p>QTD: 8</p>
          <p>R$ 2.500</p>
        </div>
      </div>
      <div className="flex h-full flex-col bg-slate-100 p-0.5">
        <p className="line-clamp-2 font-light max-md:text-xs md:line-clamp-3">
          title Iphone importado da africace Iphe importo da africace cef cece
          cc eceevrv cece ts lorem ok ipolg ok seir tyuio
        </p>
      </div>
    </div>
  )
}
