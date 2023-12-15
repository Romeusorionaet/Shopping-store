import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/providers/auth'
import '@/styles/scrollbar.css'
import { Header } from '@/components/header'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import Script from 'next/script'
import { UserContextProvider } from '@/providers/user-context'
import { ToastContainer } from 'react-toastify'
import { ourFileRouter } from './api/uploadthing/core'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  creator: 'Romeu soares Developer Full-Stack.',
  openGraph: {
    title: 'Shopping-store.',
    description: 'A shopping-store é uma loja online de vendas de produtos.',
    url: 'https://shopping-store-kappa.vercel.app',
    siteName: 'Shopping-store',
    images: [
      {
        url: 'https://www.masqueteclas.com/wp-content/uploads/2015/11/NL-5-Imagen1-gd.jpg',
        width: 700,
        height: 700,
      },
      {
        url: 'https://wallpaperaccess.com/full/1496239.jpg',
        width: 1000,
        height: 1000,
        alt: 'My custom alt',
      },
    ],
    locale: 'pt-br',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></Script>
      <Script src="https://www.mercadopago.com/v1/security.js"></Script>
      <body className={`${inter.className} mx-auto max-w-[1680px] antialiased`}>
        <UserContextProvider>
          <AuthProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Header />
            {children}
          </AuthProvider>
        </UserContextProvider>
        <ToastContainer
          autoClose={2000}
          position={'bottom-left'}
          theme="dark"
        />
      </body>
    </html>
  )
}
