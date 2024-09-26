import ClientProvidersAdmin from '@/utils/client-providers-admin'
import HeaderAdmin from './components/header-admin'
import { MenuAside } from './components/menu-aside'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <ClientProvidersAdmin>
        <HeaderAdmin />
        <div className="flex">
          <MenuAside />
          <div className="flex w-full justify-center">{children}</div>
        </div>
      </ClientProvidersAdmin>
    </div>
  )
}
