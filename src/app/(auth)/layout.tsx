import ClientProviders from '@/utils/client-providers'
import { Store } from 'lucide-react'
import Link from 'next/link'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div className="pl-6 pt-4">
        <Link className="cursor-pointer text-2xl" href={'/'}>
          <Store className="rounded-full border-b pb-1" size={36} />
        </Link>
      </div>
      <ClientProviders>{children}</ClientProviders>
    </div>
  )
}
