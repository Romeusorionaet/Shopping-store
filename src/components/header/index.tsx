'use client'

import {
  BaggageClaim,
  BookUser,
  Home,
  LibraryBig,
  LogIn,
  Menu,
  SlidersHorizontal,
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { Cart } from '../cart'
import { useContext, useState } from 'react'
import { UserContext } from '@/providers/user-context'

export function Header() {
  const { isAdm } = useContext(UserContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { status, data } = useSession()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signIn()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (err) {
      console.log(err)
    }
  }

  const handleNavigateTo = (route: string) => {
    setIsMenuOpen(false)
    setIsCartOpen(false)
    router.push(route)
  }

  return (
    <header className="rounded-none p-4 bg-base_one_reference_header fixed z-30 w-full left-0">
      <div className="flex justify-between items-center max-w-[1680px] mx-auto">
        <Sheet
          modal={false}
          open={isMenuOpen}
          onOpenChange={(open) => setIsMenuOpen(open)}
        >
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-base_one_reference_header hover:bg-white duration-700"
            >
              <Menu size={30} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-bold">
              Menu
            </SheetHeader>

            {status === 'authenticated' && data?.user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>
                </div>

                <Separator className="opacity-20" />
              </div>
            )}

            <div className="mt-10 flex flex-col justify-start gap-8">
              {status === 'unauthenticated' && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleLogin}
                  className="font-semibold w-full gap-4 hover:bg-base_reference_card hover:text-primary"
                >
                  <LogIn />
                  Fazer login
                </Button>
              )}

              {status === 'authenticated' && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleLogout}
                  className="font-semibold w-full gap-4 hover:text-primary hover:bg-base_reference_card duration-700"
                >
                  <LogIn />
                  Sair
                </Button>
              )}

              <Button
                onClick={() => handleNavigateTo('/')}
                size="icon"
                className="group font-semibold w-full hover:bg-base_reference_card gap-4 justify-start p-4 bg-transparent duration-700"
              >
                <Home
                  className="group-hover:text-base_detail_decoration duration-700"
                  size={16}
                />
                Início
              </Button>

              <Button
                onClick={() => handleNavigateTo('/catalog')}
                size="icon"
                className="group font-semibold w-full hover:bg-base_base_reference_card gap-4 justify-start p-4 bg-transparent duration-700"
              >
                <LibraryBig
                  className="group-hover:text-base_detail_decoration duration-700"
                  size={16}
                />
                Catálogo
              </Button>

              <Button
                onClick={() => handleNavigateTo('/orders')}
                size="icon"
                className="group font-semibold w-full hover:bg-base_base_reference_card gap-4 justify-start p-4 bg-transparent duration-700"
              >
                <BaggageClaim
                  className="group-hover:text-base_detail_decoration duration-700"
                  size={16}
                />
                Meus pedidos
              </Button>

              <Button
                onClick={() => handleNavigateTo('/address')}
                size="icon"
                className="group font-semibold w-full hover:50 gap-4 justify-start p-4 bg-transparent duration-700"
              >
                <BookUser
                  className="group-hover:text-base_detail_decoration duration-700"
                  size={16}
                />
                Endereço de entrega
              </Button>

              {isAdm ? (
                <Button
                  onClick={() => handleNavigateTo('/control-adm')}
                  size="icon"
                  className="group font-semibold w-full hover:bg-base_reference_card gap-4 justify-start p-4 bg-transparent duration-700"
                >
                  <SlidersHorizontal
                    className="group-hover:text-base_detail_decoration duration-700"
                    size={16}
                  />
                  Controlar produtos
                </Button>
              ) : (
                <></>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <h1
          onClick={() => handleNavigateTo('/')}
          className="text-2xl font-bold cursor-pointer"
        >
          Shopping Store
        </h1>

        <Sheet open={isCartOpen} onOpenChange={(open) => setIsCartOpen(open)}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-base_one_reference_header hover:bg-white duration-700"
            >
              <BaggageClaim size={30} />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader className="text-left text-lg font-bold">
              Carrinho
            </SheetHeader>

            <Cart handleNavigateTo={handleNavigateTo} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
