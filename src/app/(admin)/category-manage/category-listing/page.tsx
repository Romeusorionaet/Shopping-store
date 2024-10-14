import { Pagination } from '@/components/pagination'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CategoryManageHeader } from '../components/category-manage-header'
import { CategoryCardPreviewAdmin } from '../../components/category-card-admin/category-card-preview-admin'

export default function CategoryListing() {
  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader />

      <main>
        <section className="mt-20 px-1 data-[value=true]:hidden md:justify-start xl:justify-center">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="nome"
              className="bg-transparent md:w-[25rem]"
            />

            <Button>Buscar</Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex flex-col gap-6">
              <Link
                href={`/category-manage/update-category/id-test`}
                className="text-center underline"
              >
                Atualizar
              </Link>
              <CategoryCardPreviewAdmin />
              <Link
                href="/category-manage/category-view/id-test"
                className="underline"
              >
                Detalhes tecnicos
              </Link>
            </div>
          </div>
        </section>
        <Pagination disableArrowIf={true} sizeList={15} />
      </main>
    </div>
  )
}
