import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
