import HeaderAdmin from './components/header-admin'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <HeaderAdmin />
      {children}
    </div>
  )
}
