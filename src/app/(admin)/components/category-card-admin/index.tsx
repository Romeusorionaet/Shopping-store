import LogoMarcaAsus from '@/assets/img/logo-marca/logo-asus.png'
import Image from 'next/image'

export function CategoryCardAdmin() {
  return (
    <div>
      <div className="h-16 w-16 md:h-20 md:w-20">
        <Image
          height={400}
          width={400}
          src={LogoMarcaAsus}
          alt="product image view"
          className="h-full w-full border border-slate-300 object-fill"
        />
      </div>
      <p className="text-center">Asus</p>
    </div>
  )
}
