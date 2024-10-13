'use client'

import { AlertCircle, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  productId?: string
}

export function ProductManageHeader({ productId }: Props) {
  const pathname = usePathname()

  const isRegisterPage = pathname === '/product-manage/register-product'
  const isUpdatePage = pathname === '/product-manage/product-listing'

  return (
    <section className="flex h-44 w-full flex-col justify-evenly gap-2 border-b border-b-base_one_reference_header/20 bg-base_color_text_top md:justify-evenly">
      <section className="flex w-full items-center justify-evenly">
        <Link
          href="/product-manage"
          className="group flex items-end gap-2 rounded-lg border border-base_color_dark/10 p-1 duration-500 hover:bg-base_one_reference_header"
        >
          <Package
            color="white"
            className="h-6 w-6 rounded-lg bg-base_color_dark p-1 md:h-8 md:w-8"
          />
          <h1 className="duration-500 group-hover:text-base_color_text_top max-md:text-sm">
            Produto
          </h1>
        </Link>

        <div className="flex items-end gap-2">
          <p className="max-md:hidden">Gerenciamento</p>
          <AlertCircle className="h-6 w-6" />
        </div>
      </section>

      <nav className="ml-16 max-md:pr-6">
        <ul className="flex flex-wrap gap-4 max-md:text-sm">
          <li
            data-value={isRegisterPage}
            className="group rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <Link
              href="/product-manage/register-product"
              className="underline group-data-[value=true]:no-underline"
            >
              Registrar um novo produto
            </Link>
          </li>
          <li
            data-value={isUpdatePage}
            className="group rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <Link
              href="/product-manage/product-listing"
              className="underline group-data-[value=true]:no-underline"
            >
              Listagem de produtos
            </Link>
          </li>
          <li
            data-value={!!productId}
            className="group rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <span className="group-data-[value=false]:hidden">
              ID: {productId}
            </span>
          </li>
        </ul>
      </nav>
    </section>
  )
}
