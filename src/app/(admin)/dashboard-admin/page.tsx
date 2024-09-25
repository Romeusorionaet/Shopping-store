import {
  AlertCircle,
  CalendarClock,
  Home,
  LineChart,
  Users,
} from 'lucide-react'
import { CardView } from '../components/card-view'
import { CardViewHeader } from '../components/card-view/card-view-header'
import { CardViewContent } from '../components/card-view/card-view-content'
import { CardViewFooter } from '../components/card-view/card-view-footer'

export default function DashboardAdmin() {
  return (
    <main>
      <div className="flex justify-around">
        <div className="flex items-end gap-4">
          <div className="rounded-lg bg-gray-600 p-1">
            <Home color="white" />
          </div>
          <p>Dashboard</p>
        </div>

        <div className="flex items-end gap-4">
          <p>Overview</p>
          <AlertCircle />
        </div>
      </div>

      <section className="mt-20 flex flex-wrap items-center justify-center gap-10">
        <CardView>
          <CardViewHeader>
            <h3>Vendas da semana</h3>
            <LineChart />
          </CardViewHeader>
          <CardViewContent>
            <strong>R$</strong> 15.000
          </CardViewContent>
          <CardViewFooter>
            <div className="h-2 w-2 rounded-full bg-base_color_positive" />
            Aumento de <strong>60%</strong>
          </CardViewFooter>
        </CardView>

        <CardView>
          <CardViewHeader>
            <h3>Pedidos da semana</h3>
            <CalendarClock />
          </CardViewHeader>
          <CardViewContent>
            <strong>R$</strong> 41.190
          </CardViewContent>
          <CardViewFooter>
            <div className="h-2 w-2 rounded-full bg-base_color_positive" />
            Aumento de <strong>60%</strong>
          </CardViewFooter>
        </CardView>

        <CardView>
          <CardViewHeader>
            <h3>Visitas Online</h3>
            <div className="h-4 w-4 rounded-full bg-base_color_positive" />
          </CardViewHeader>
          <CardViewContent className="flex items-center gap-4">
            <Users />
            <p>1.891</p>
          </CardViewContent>
          <CardViewFooter>
            <div className="h-2 w-2 rounded-full bg-base_color_negative" />
            Queda de <strong>5%</strong>
          </CardViewFooter>
        </CardView>
      </section>
    </main>
  )
}
