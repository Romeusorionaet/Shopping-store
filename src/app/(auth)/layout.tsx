import ClientProviders from '@/utils/client-providers'
import { Store } from 'lucide-react'
import Link from 'next/link'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="pt-4">
        <Link
          title="Home"
          className="ml-6 flex cursor-pointer items-center gap-2 text-2xl"
          href={'/'}
        >
          <Store className="rounded-full border-b pb-1" size={36} />
          <span className="text-lg">Shopping store</span>
        </Link>
      </div>

      <ClientProviders>{children}</ClientProviders>
    </div>
  )
}
