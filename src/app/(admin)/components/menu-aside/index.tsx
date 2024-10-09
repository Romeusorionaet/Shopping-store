'use client'

import { Button } from '@/components/ui/button'
import { Home, Menu, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function MenuAside() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  const router = useRouter()

  const handleExpandMenuAside = () => {
    if (isMenuExpanded) {
      setIsMenuExpanded(false)
      return
    } else {
      setIsMenuExpanded(true)
      return
    }
  }

  const handleNavigateTo = (route: string) => {
    setIsMenuExpanded(false)
    router.push(route)
  }

  return (
    <aside
      data-value={isMenuExpanded}
      className="fixed top-0 z-20 w-12 overflow-hidden pt-24 duration-500 data-[value=true]:w-[150px]"
    >
      <nav className="h-screen bg-slate-100 pt-6">
        <ul className="flex w-full flex-col items-end gap-6">
          <li className="fixed -left-2 top-6 md:top-8 xl:left-10">
            <Button variant="ghost" onClick={() => handleExpandMenuAside()}>
              <span className="mr-4 max-xl:hidden">Menu</span>
              <Menu />
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => handleNavigateTo('/dashboard-admin')}
              className="flex items-center gap-2"
            >
              <p
                data-value={isMenuExpanded}
                className="data-[value=false]:hidden"
              >
                Dashboard
              </p>
              <Home />
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => handleNavigateTo('/product-manage')}
              className="flex items-center gap-2"
            >
              <p
                data-value={isMenuExpanded}
                className="data-[value=false]:hidden"
              >
                Produto
              </p>
              <Package />
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
