import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/assets/styles/globals.css'
import '@/assets/styles/scrollbar.css'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ToastContainer } from 'react-toastify'
import ClientProviders from '@/utils/client-providers'
import { ourFileRouter } from './api/uploadthing/our-file-router'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

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
      <body className={`${roboto.variable} mx-auto max-w-[1680px] antialiased`}>
        <ClientProviders>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

          {children}

          <ToastContainer
            autoClose={3000}
            position={'bottom-left'}
            theme="light"
          />
        </ClientProviders>
      </body>
    </html>
  )
}
