import { Home, List, LogIn, Menu, Percent, ShoppingBag } from 'lucide-react'
import { Card } from './card'
import { Button } from './button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'

export function Header() {
  return (
    <Card className="flex justify-around items-center rounded-none p-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="bg-white group ">
            <Menu className="group-hover:text-white transition duration-700" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-bold">
            Menu
          </SheetHeader>

          <div className="mt-10 flex flex-col justify-start gap-8">
            <Button
              size="icon"
              variant="outline"
              className="font-semibold w-full gap-4 hover:bg-white hover:text-primary"
            >
              <LogIn />
              Fazer login
            </Button>

            <Button
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
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-2xl font-bold">Shopping Store</h1>
      <ShoppingBag size={28} />
    </Card>
  )
}
