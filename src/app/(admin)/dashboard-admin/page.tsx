import {
  AlertCircle,
  CalendarClock,
  Home,
  LineChart,
  Users,
} from 'lucide-react'

export default function DashboardAdmin() {
  return (
    <main className="ml-12 w-full pt-44">
      <section className="fixed left-0 top-24 z-10 flex h-28 w-full items-center justify-evenly gap-10 bg-base_color_text_top md:justify-evenly">
        <div className="flex items-end gap-2">
          <Home
            color="white"
            className="rounded-lg bg-base_color_dark p-1"
            size={30}
          />
          <p>Dashboard</p>
        </div>

        <div className="flex items-end gap-2">
          <p className="max-md:hidden">Overview</p>
          <AlertCircle />
        </div>
      </section>

      <section className="mt-20 flex flex-1 items-center justify-center gap-4 px-1 max-md:flex-wrap">
        <article className="flex h-56 w-full max-w-[300px] flex-col justify-around rounded-lg bg-teal-200 pl-4">
          <header className="flex items-center gap-6">
            <h3>Vendas da semana</h3>
            <LineChart />
          </header>
          <div className="text-2xl">
            <p>
              <strong>R$</strong> 15.000
            </p>
          </div>
          <footer className="flex items-center gap-4">
            <div className="h-2 w-2 items-center gap-4 rounded-full bg-base_color_positive" />
            Aumento de <strong>10%</strong>
          </footer>
        </article>

        <article className="flex h-56 w-full max-w-[300px] flex-col justify-around rounded-lg bg-yellow-200 pl-4">
          <header className="flex items-center gap-6">
            <h3>Pedidos da semana</h3>
            <CalendarClock />
          </header>
          <div className="text-2xl">
            <p>
              <strong>R$</strong> 25.500
            </p>
            <p className="text-base">198 pedidos</p>
          </div>
          <footer className="flex items-center gap-4">
            <div className="h-2 w-2 items-center gap-4 rounded-full bg-base_color_positive" />
            Aumento de <strong>15%</strong>
          </footer>
        </article>

        <article className="flex h-56 w-full max-w-[300px] flex-col justify-around rounded-lg bg-lime-200 pl-4">
          <header className="flex items-center gap-6">
            <h3>Visitas Online</h3>
            <div className="h-4 w-4 rounded-full bg-base_color_positive" />
          </header>
          <div className="flex items-center gap-4 text-2xl">
            <Users />
            <p>1.891</p>
          </div>
          <footer className="flex items-center gap-4">
            <div className="h-2 w-2 items-center gap-4 rounded-full bg-base_color_negative" />
            Queda de <strong>5%</strong>
          </footer>
        </article>
      </section>
    </main>
  )
}
