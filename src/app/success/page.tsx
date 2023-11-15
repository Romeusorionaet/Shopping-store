'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import uniqueCartIcon from '../../../public/unique-cart-icon.png'
import confetes from '../../../public/confetes.png'
import Image from 'next/image'

export default function Success() {
  const navigate = useRouter()

  const handleNavigateToOrders = () => {
    navigate.push('/orders')
  }

  return (
    <div className="text-center">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-52 object-contain"
        src={confetes}
        alt="unique Cart Icon"
      />
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-52 object-contain -mt-24"
        src={uniqueCartIcon}
        alt="unique Cart Icon"
      />

      <Button
        onClick={handleNavigateToOrders}
        className="bg-green-500 p-2 rounded-md sm:w-56"
      >
        Ver pedidos
      </Button>
    </div>
  )
}
