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
import { useContext, useState } from 'react'
import { checkIsPrivateRoute } from '@/utils/check-is-private-route'
import { signOut, useSession } from 'next-auth/react'
import { UserContext } from '@/providers/user-context'
import { DialogLoginAdm } from '../dialog-login-adm'
import { cleanAuthCookies } from '@/actions/auth/sign-out'

export function Header() {
  const { profile, refetchUserProfile } = useContext(UserContext)
  const { data } = useSession()
  const isAdm = false // por enquanto / pegar role do profile
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean | undefined>(false)

  const router = useRouter()

  const handleLogout = async () => {
    const logOutFromGoogle = !!data?.user

    if (logOutFromGoogle) {
      await Promise.all([signOut(), cleanAuthCookies()])
    } else {
      await Promise.all([cleanAuthCookies(), refetchUserProfile()])
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
      router.push(route)
    }
  }

  return (
    <header className="fixed left-0 z-30 w-full rounded-none border-b border-b-base_color_dark/30 bg-base_one_reference_header p-2 text-base_color_text_top">
      <DialogLoginAdm handleCancel={handleCancel} isDialogOpen={isDialogOpen} />
      <div className="mx-auto flex max-w-[1550px] items-center justify-between md:gap-16 md:px-10">
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
            className="bg-base_color_text_top text-foreground"
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

              <div className="flex items-center justify-between gap-8">
                <div className="w-full">
                  {!profile.username ? (
                    <div className="flex flex-col gap-4">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleNavigateTo('/signIn')}
                        className="w-full gap-4 font-bold uppercase hover:bg-base_one_reference_header hover:text-base_color_text_top"
                      >
                        Login
                        <LogIn size={18} />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full gap-4 font-semibold duration-700 hover:bg-base_one_reference_header hover:text-base_color_text_top"
                    >
                      <LogIn size={26} />
                      Sair
                    </Button>
                  )}
                </div>

                <>
                  {profile.username ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 py-4">
                        <Avatar>
                          <AvatarFallback>{profile.username}</AvatarFallback>

                          {/* {data.user.image && (
                            <AvatarImage src={data.user.image} />
                          )} */}
                        </Avatar>
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

        <div className="flex gap-2">
          <h1
            onClick={() => handleNavigateTo('/')}
            className="cursor-pointer text-2xl font-bold"
          >
            Shopping Store
          </h1>
        </div>

        <div>
          {profile.username ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 md:py-4">
                <Avatar>
                  <AvatarFallback>{profile.username}</AvatarFallback>

                  {/* {data.user.image && <AvatarImage src={data.user.image} />} */}
                </Avatar>

                <div className="flex flex-col max-md:hidden">
                  <p className="font-medium">{profile.username}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleNavigateTo('/signIn')}
                className="w-full gap-4 font-semibold duration-700"
              >
                <LogIn />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
