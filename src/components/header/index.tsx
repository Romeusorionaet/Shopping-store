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
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'
import { Cart } from '../cart'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/providers/user-context'
// import { useCartStore } from '@/providers/zustand-store'
import { checkIsPrivateRoute } from '@/utils/check-is-private-route'
import { DialogLoginAdm } from '../dialog-login-adm'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { signIn } from 'next-auth/react'

export function Header() {
  const { profile } = useContext(UserContext)
  const isAdm = false // por enquanto
  // const { cart } = useCartStore()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean | undefined>(false)

  const [clientRendered, setClientRendered] = useState(false)

  const router = useRouter()

  // const conditionForShowSizeCart =
  //   clientRendered && cart.length !== 0 && profile.id

  console.log(profile)

  useEffect(() => {
    // hydrate
    setClientRendered(true)
  }, [])

  const testRoute = async () => {
    console.log('foi===')
    try {
      await api.get('/test-route')
    } catch (err) {
      console.log('error:', err)
    }
  }

  const handleLogin = async () => {
    try {
      const test = await signIn()
      // const test = getGoogleOAuthURL()
      console.log(test, '====dtest header===')
    } catch (err) {
      console.log(err, '====deu erro')
    }
  }

  const handleLogout = async () => {
    try {
      Cookies.remove('@shopping-store/AT.2.0')
      Cookies.remove('@shopping-store/RT.2.0')

      api.post('/auth/user/signUp', {
        headers: {
          'Content-Type': 'application/json',
        },
        id: profile?.id,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  const handleNavigateTo = (route: string) => {
    const isPrivateRoute = checkIsPrivateRoute(route)

    if (isPrivateRoute) {
      setIsDialogOpen(true)
    } else {
      setIsMenuOpen(false)
      setIsCartOpen(false)
      router.push(route)
    }
  }

  return (
    <header className="fixed left-0 z-30 w-full rounded-none bg-base_one_reference_header p-4 text-foreground">
      <DialogLoginAdm handleCancel={handleCancel} isDialogOpen={isDialogOpen} />
      <div className="mx-auto flex max-w-[1550px] items-center justify-between md:px-10">
        <Sheet
          modal={false}
          open={isMenuOpen}
          onOpenChange={(open) => setIsMenuOpen(open)}
        >
          <SheetTrigger asChild className="border-none duration-700">
            <Menu size={30} />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-base_one_reference_header text-foreground"
          >
            <SheetHeader className="text-left text-lg font-bold">
              Menu
            </SheetHeader>

            <div className="mt-10 flex h-full flex-col justify-between gap-8 pb-14 md:pb-16">
              <div className="flex flex-col justify-start gap-4 md:gap-8">
                <Button
                  variant="secondary"
                  onClick={() => handleNavigateTo('/')}
                  size="icon"
                  className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
                >
                  <Home
                    className="duration-700 group-hover:scale-110"
                    size={26}
                  />
                  Início
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => handleNavigateTo('/catalog')}
                  size="icon"
                  className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
                >
                  <LibraryBig
                    className="duration-700 group-hover:scale-110"
                    size={26}
                  />
                  Catálogo
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => handleNavigateTo('/orders')}
                  size="icon"
                  className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
                >
                  <BaggageClaim
                    className="duration-700 group-hover:scale-110"
                    size={26}
                  />
                  Meus pedidos
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => handleNavigateTo('/address')}
                  size="icon"
                  className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
                >
                  <BookUser
                    className="duration-700 group-hover:scale-110"
                    size={26}
                  />
                  Endereço de entrega
                </Button>

                <>
                  {isAdm ? (
                    <Button
                      variant="secondary"
                      onClick={() => handleNavigateTo('/control-adm')}
                      size="icon"
                      className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
                    >
                      <SlidersHorizontal
                        className="duration-700 group-hover:scale-110"
                        size={26}
                      />
                      Controlar produtos
                    </Button>
                  ) : (
                    <></>
                  )}
                </>
              </div>

              <button onClick={() => testRoute()}>Teste</button>

              <div className="flex flex-col items-center justify-center">
                <>
                  {!profile.id ? (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleLogin}
                      className="w-full gap-4 font-semibold hover:bg-base_reference_card hover:text-primary"
                    >
                      <LogIn />
                      Fazer login
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full gap-4 font-semibold duration-700 hover:bg-base_reference_card hover:text-primary"
                    >
                      <LogIn size={26} />
                      Sair
                    </Button>
                  )}
                </>

                <>
                  {profile.id ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 py-4">
                        <Avatar>
                          <AvatarFallback>
                            {profile.username.toUpperCase()}
                          </AvatarFallback>

                          {/* {data.user.image && (
                            <AvatarImage src={data.user.image} />
                          )} */}
                        </Avatar>

                        <div className="flex flex-col">
                          <p className="font-medium">{profile.username}</p>
                          <p className="text-sm opacity-75">Boas compras!</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <h1
          onClick={() => handleNavigateTo('/')}
          className="cursor-pointer text-2xl font-bold"
        >
          Shopping Store
        </h1>

        <Sheet open={isCartOpen} onOpenChange={(open) => setIsCartOpen(open)}>
          <SheetTrigger asChild>
            <div className="relative border-none bg-base_one_reference_header duration-700">
              <BaggageClaim size={30} />
              {/* {conditionForShowSizeCart && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                  <p>{clientRendered && cart.length}</p>
                </div>
              )} */}
            </div>
          </SheetTrigger>

          <SheetContent className="bg-base_one_reference_header text-foreground">
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
