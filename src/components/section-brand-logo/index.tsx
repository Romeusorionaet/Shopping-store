import Image from 'next/image'
import brandMotorola from '@/assets/img/logo-marca/logo-motorola.png'
import brandAsus from '@/assets/img/logo-marca/logo-asus.png'
import brandHuawei from '@/assets/img/logo-marca/logo-huawei.png'
import brandIphone from '@/assets/img/logo-marca/logo-iphone.png'
import brandLG from '@/assets/img/logo-marca/logo-lg.png'
import brandMultaliser from '@/assets/img/logo-marca/logo-multilaser.png'
import brandXiaomi from '@/assets/img/logo-marca/logo-xiaomi.jpg'
import brandSamsung from '@/assets/img/logo-marca/logo-samsung.png'
import brandRealme from '@/assets/img/logo-marca/logo-realme.png'
import brandPositivo from '@/assets/img/logo-marca/logo-positivo.png'

export function SectionBrandLogo() {
  const brandLogoList = [
    { id: '1', img: brandMotorola, name: 'logo marca da motorola' },
    { id: '2', img: brandAsus, name: 'logo marca da asus' },
    { id: '3', img: brandHuawei, name: 'logo marca da huawei' },
    { id: '4', img: brandIphone, name: 'logo marca da iphone' },
    { id: '5', img: brandLG, name: 'logo marca da lg' },
    { id: '6', img: brandMultaliser, name: 'logo marca da multilaser' },
    { id: '7', img: brandXiaomi, name: 'logo marca da xiaomi' },
    { id: '8', img: brandSamsung, name: 'logo marca da samsung' },
    { id: '9', img: brandRealme, name: 'logo marca da realme' },
    { id: '10', img: brandPositivo, name: 'logo marca da positivo' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 border-t">
      {brandLogoList.map((logo) => {
        return (
          <div key={logo.id} className="h-28 w-28">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full rounded-md object-contain"
              src={logo.img}
              alt={logo.name}
            />
          </div>
        )
      })}
    </div>
  )
}
