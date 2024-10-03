'use client'

import { AlertCircle, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ProductManageHeader() {
  const pathname = usePathname()

  const isRegisterPage = pathname === '/product-manage/register-product'
  const isUpdatePage = pathname === '/product-manage/update-product'

  return (
    <section className="fixed left-0 top-24 z-10 flex h-44 w-full flex-col justify-evenly gap-2 border-b border-b-base_one_reference_header/20 bg-base_color_text_top md:justify-evenly">
      <section className="flex w-full items-center justify-evenly">
        <div className="flex items-end gap-2">
          <Package
            color="white"
            className="rounded-lg bg-base_color_dark p-1"
            size={30}
          />
          <h1>Produto</h1>
        </div>

        <div className="flex items-end gap-2">
          <p className="max-md:hidden">Gerenciamento</p>
          <AlertCircle />
        </div>
      </section>

      <div className="ml-16 max-md:pr-6">
        <ul className="flex gap-4 max-md:text-xs">
          <li
            data-value={isRegisterPage}
            className="rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <Link
              href="/product-manage/register-product"
              className="hover:underline"
            >
              Registrar um novo produto
            </Link>
          </li>
          <li
            data-value={isUpdatePage}
            className="rounded-lg  p-1 data-[value=true]:bg-slate-200"
          >
            <Link
              href="/product-manage/update-product"
              className="hover:underline"
            >
              Atualizar algum produto
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
