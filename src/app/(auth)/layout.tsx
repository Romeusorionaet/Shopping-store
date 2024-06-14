import ClientProviders from '@/utils/client-providers'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientProviders>{children}</ClientProviders>
}
