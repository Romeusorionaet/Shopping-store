'use client'

import {
  BaggageClaim,
  Flame,
  Home,
  LibraryBig,
  LogIn,
  Menu,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { Cart } from '../cart'
import { useEffect, useState } from 'react'

interface Props {
  isAdm: boolean | undefined
}

export function Header({ isAdm }: Props) {
  const [sizeCart, setSizeCart] = useState(0)

  useEffect(() => {
    const cartSavedInLocalStorage = JSON.parse(
      localStorage.getItem('@shopping-store/cart-products') || '[]',
    )
    setSizeCart(cartSavedInLocalStorage.length)
  }, [])

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

  const handleNavigateToHomePage = () => {
    router.push('/')
  }

  const handleNavigateToOffers = () => {
    router.push('/offers')
  }

  const handleNavigateToCatalog = () => {
    router.push('/catalog')
  }

  const handleNavigateToOrdersPage = () => {
    router.push('/orders')
  }

  const handleNavigateToRegisterProducts = () => {
    router.push('/control-adm')
  }

  return (
    <header className="flex justify-between items-center rounded-none p-4 bg-amber-200 fixed z-30 w-full px-[5%]">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-amber-200 hover:bg-white duration-700"
          >
            <Menu />
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
                className="font-semibold w-full gap-4 hover:bg-amber-50 hover:text-primary"
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
                className="font-semibold w-full gap-4 hover:text-primary hover:bg-amber-50 duration-700"
              >
                <LogIn />
                Sair
              </Button>
            )}

            <Button
              onClick={() => handleNavigateToHomePage()}
              size="icon"
              className="group font-semibold w-full hover:bg-amber-50 gap-4 justify-start p-4 bg-transparent duration-700"
            >
              <Home
                className="group-hover:text-amber-500 duration-700"
                size={16}
              />
              Início
            </Button>

            <Button
              onClick={handleNavigateToOffers}
              size="icon"
              className="group font-semibold w-full hover:bg-amber-50 gap-4 justify-start p-4 bg-transparent duration-700"
            >
              <Flame
                className="group-hover:text-amber-500 duration-700"
                size={16}
              />
              Super Ofertas
            </Button>

            <Button
              onClick={handleNavigateToCatalog}
              size="icon"
              className="group font-semibold w-full hover:bg-amber-50 gap-4 justify-start p-4 bg-transparent duration-700"
            >
              <LibraryBig
                className="group-hover:text-amber-500 duration-700"
                size={16}
              />
              Catálogo
            </Button>

            <Button
              onClick={() => handleNavigateToOrdersPage()}
              size="icon"
              className="group font-semibold w-full hover:bg-amber-50 gap-4 justify-start p-4 bg-transparent duration-700"
            >
              <BaggageClaim
                className="group-hover:text-amber-500 duration-700"
                size={16}
              />
              Meus pedidos
            </Button>

            {isAdm ? (
              <Button
                onClick={() => handleNavigateToRegisterProducts()}
                size="icon"
                className="group font-semibold w-full hover:bg-amber-50 gap-4 justify-start p-4 bg-transparent duration-700"
              >
                <SlidersHorizontal
                  className="group-hover:text-amber-500 duration-700"
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
        onClick={handleNavigateToHomePage}
        className="text-2xl font-bold cursor-pointer"
      >
        Shopping Store
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-amber-200 hover:bg-white duration-700 relative"
          >
            <ShoppingBag size={28} />
            <span className="bg-zinc-100/50 p-1 rounded-full w-6 absolute -top-2 -right-2">
              {sizeCart}
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader className="text-left text-lg font-bold">
            Carrinho
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>
    </header>
  )
}
