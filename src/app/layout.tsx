import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { AuthProvider } from '@/providers/auth'
import '../styles/scrollbar.css'
import { getDataUser } from '@/lib/getData/get-data.user'
import PrivateRoute from '@/components/routes-page/private-route'
import { Header } from '@/components/header'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from './api/uploadthing/core'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopping Store',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { props } = await getDataUser()
  const isAdm = props?.isAdm

  return (
    <html lang="en">
      <Script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></Script>
      <Script src="https://www.mercadopago.com/v1/security.js"></Script>
      <body className={inter.className}>
        <PrivateRoute isAdm={isAdm}>
          <AuthProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Header isAdm={isAdm} />
            {children}
          </AuthProvider>
        </PrivateRoute>
      </body>
    </html>
  )
}
