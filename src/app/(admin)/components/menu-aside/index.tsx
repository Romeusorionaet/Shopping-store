'use client'

import { Button } from '@/components/ui/button'
import { Home, Menu } from 'lucide-react'
import { useState } from 'react'

export function MenuAside() {
  const [isExpandedMenuAside, setIsExpandedMenuAside] = useState(false)

  const handleExpandMenuAside = () => {
    if (isExpandedMenuAside) {
      setIsExpandedMenuAside(false)
      return
    } else {
      setIsExpandedMenuAside(true)
      return
    }
  }
  return (
    <aside
      data-value={isExpandedMenuAside}
      className="fixed top-0 w-12 overflow-hidden pt-24 duration-500 data-[value=true]:w-[250px]"
    >
      <nav className="h-screen bg-slate-100 pt-6">
        <ul className="flex w-full flex-col items-center gap-6">
          <li className="fixed -left-2 top-6 md:top-8 xl:left-[85px]">
            <Button variant="ghost" onClick={() => handleExpandMenuAside()}>
              <span className="mr-4 max-xl:hidden">Menu</span>
              <Menu />
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="flex items-center gap-4">
              <p
                data-value={isExpandedMenuAside}
                className="data-[value=false]:hidden"
              >
                Dashboard
              </p>

              <Home />
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="flex items-center gap-4">
              <p
                data-value={isExpandedMenuAside}
                className="data-[value=false]:hidden"
              >
                Dashboard
              </p>

              <Home />
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="flex items-center gap-4">
              <p
                data-value={isExpandedMenuAside}
                className="data-[value=false]:hidden"
              >
                Dashboard
              </p>

              <Home />
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
