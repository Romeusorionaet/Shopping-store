'use client'

import { AlertCircle, SquareStack } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  categoryId?: string
}

export function CategoryManageHeader({ categoryId }: Props) {
  const pathname = usePathname()

  const isRegisterPage = pathname === '/category-manage/register-category'
  const isUpdatePage = pathname === '/category-manage/category-listing'

  return (
    <section className="flex h-44 w-full flex-col justify-evenly gap-2 border-b border-b-base_one_reference_header/20 bg-base_color_text_top md:justify-evenly">
      <section className="flex w-full items-center justify-evenly">
        <Link
          href="/product-manage"
          className="group flex items-end gap-2 rounded-lg border border-base_color_dark/10 p-1 duration-500 hover:bg-base_one_reference_header"
        >
          <SquareStack
            color="white"
            className="h-6 w-6 rounded-lg bg-base_color_dark p-1 md:h-8 md:w-8"
          />
          <h1 className="duration-500 group-hover:text-base_color_text_top max-md:text-sm">
            Categoria
          </h1>
        </Link>

        <AlertCircle className="h-6 w-6" />
      </section>

      <nav className="ml-16 max-md:pr-6">
        <ul className="flex flex-wrap gap-4 max-md:text-sm">
          <li
            data-value={isRegisterPage}
            className="group rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <Link
              href="/category-manage/register-category"
              className="underline group-data-[value=true]:no-underline"
            >
              Registrar uma nova categoria
            </Link>
          </li>
          <li
            data-value={isUpdatePage}
            className="group rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <Link
              href="/category-manage/category-listing"
              className="underline group-data-[value=true]:no-underline"
            >
              Listagem de categorias
            </Link>
          </li>
          <li
            data-value={!!categoryId}
            className="group rounded-lg p-1 data-[value=true]:bg-slate-200"
          >
            <span className="group-data-[value=false]:hidden">
              ID: {categoryId}
            </span>
          </li>
        </ul>
      </nav>
    </section>
  )
}
