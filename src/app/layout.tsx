import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/providers/auth'
import '@/styles/scrollbar.css'
import { Header } from '@/components/header'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { UserContextProvider } from '@/providers/user-context'
import { ToastContainer } from 'react-toastify'
import { ourFileRouter } from './api/uploadthing/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://shopping-store-kappa.vercel.app'),
  creator: 'Romeu soares Developer Full-Stack.',
  title: {
    template: '%s | Shopping-store',
    absolute: 'Shopping-store',
  },
  description: 'A shopping-store é uma loja online de vendas de produtos.',
  openGraph: {
    images: [
      {
        url: 'https://www.masqueteclas.com/wp-content/uploads/2015/11/NL-5-Imagen1-gd.jpg',
        width: 700,
        height: 700,
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
      <body className={`${inter.className} mx-auto max-w-[1680px] antialiased`}>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <AuthProvider>
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <Header />
              {children}
            </AuthProvider>
          </UserContextProvider>
          <ToastContainer
            autoClose={2000}
            position={'bottom-left'}
            theme="dark"
          />
        </QueryClientProvider>
      </body>
    </html>
  )
}
