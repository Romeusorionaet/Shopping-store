import { Pagination } from '@/components/pagination'
import { ProductManageHeader } from '../components/product-manage-header'
import { ProductCardPreviewAdmin } from '../../components/product-card-admin/product-card-preview-admin'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ProductListing() {
  const categories = [{ title: 'Samsung' }, { title: 'Motorola' }]

  return (
    <div className="ml-12 w-full pt-32">
      <ProductManageHeader />

      <main>
        <section className="mt-20 px-1 data-[value=true]:hidden md:justify-start xl:justify-center">
          <div className="mb-10 flex gap-6 max-md:flex-col">
            <select
              defaultValue="Samsung"
              className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
            >
              <option value="">Selecione</option>
              {categories.map((category, index) => (
                <option key={index}>{category.title}</option>
              ))}
            </select>

            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="nome"
                className="bg-transparent md:w-[25rem]"
              />

              <Button>Buscar</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-6">
              <Link
                href={`/product-manage/update-product/id-test`}
                className="text-center underline"
              >
                Atualizar
              </Link>
              <ProductCardPreviewAdmin />
              <Link
                href="/product-manage/product-view/id-test"
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
