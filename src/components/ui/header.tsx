'use client'

import { Home, List, LogIn, Menu, Percent, ShoppingBag } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './button'
import { Card } from './card'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Separator } from './separator'
import { useRouter } from 'next/navigation'
import { Cart } from './cart'

interface Props {
  isAdm?: boolean
}

export function Header({ isAdm }: Props) {
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

  const handleNavigateToOrdersPage = () => {
    router.push('/orders')
  }

  const handleNavigateToRegisterProducts = () => {
    router.push('/control-adm')
  }

  return (
    <Card className="flex justify-around items-center rounded-none p-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="group hover:bg-white"
          >
            <Menu className="group-hover:text-zinc-900 transition duration-700" />
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

              <Separator />
            </div>
          )}

          <div className="mt-10 flex flex-col justify-start gap-8">
            {status === 'unauthenticated' && (
              <Button
                size="icon"
                variant="outline"
                onClick={handleLogin}
                className="font-semibold w-full gap-4 hover:bg-white hover:text-primary"
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
                className="font-semibold w-full gap-4 hover:bg-white hover:text-primary"
              >
                <LogIn />
                Sair
              </Button>
            )}

            <Button
              onClick={() => handleNavigateToHomePage()}
              size="icon"
              className="font-semibold w-full gap-1 justify-start bg-transparent"
            >
              <Home size={16} />
              Início
            </Button>

            <Button
              size="icon"
              className="font-semibold w-full gap-1 justify-start bg-transparent"
            >
              <Percent size={16} />
              Ofertas
            </Button>

            <Button
              size="icon"
              className="font-semibold w-full gap-1 justify-start bg-transparent"
            >
              <List size={16} />
              Catálogo
            </Button>

            <Button
              onClick={() => handleNavigateToOrdersPage()}
              size="icon"
              className="font-semibold w-full gap-1 justify-start bg-transparent"
            >
              <List size={16} />
              Meus pedidos
            </Button>

            {isAdm ? (
              <Button
                onClick={() => handleNavigateToRegisterProducts()}
                size="icon"
                className="font-semibold w-full gap-1 justify-start bg-transparent"
              >
                <List size={16} />
                Controlar produtos
              </Button>
            ) : (
              <></>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-2xl font-bold">Shopping Store</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="group">
            <ShoppingBag size={28} />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader className="text-left text-lg font-bold">
            Sacola
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  )
}
