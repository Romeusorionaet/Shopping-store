import { Pagination } from '@/components/pagination'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import '@/assets/styles/components/accordion.css'
import { ProductManageHeader } from '../components/product-manage-header'
import { ProductCardPreviewAdmin } from '../../components/product-card-admin/product-card-preview-admin'
import Link from 'next/link'

export default function UpdateProduct() {
  return (
    <main className="ml-12 w-full pt-32">
      <ProductManageHeader />

      <section className="mt-28 px-1">
        <section className="flex h-full w-full justify-center gap-6 rounded-lg max-md:flex-wrap">
          <div className="h-[400px] w-full max-w-[600px] rounded-lg bg-blue-200">
            <p>Exibir outros dados</p>
          </div>
          <div className="h-[400px] w-full max-w-[600px] rounded-lg bg-pink-200">
            <p>Exibir outros dados</p>
          </div>
        </section>

        <section className="my-10">
          {/* <Accordion type="single" collapsible>
            <AccordionItem
              id="accordion-item-product-admin"
              value="item-1"
              className="duration-1000 data-[state=closed]:border-none data-[state=open]:border-slate-500"
            >
              <AccordionTrigger className="font-normal">
                <p>
                  Listagem de todas <strong>Categorias</strong> registrado
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <section className="mt-4 flex flex-1 flex-wrap justify-center gap-2 data-[value=true]:hidden md:justify-start xl:justify-center">
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                  <CategoryCardAdmin />
                </section>
                <Pagination disableArrowIf={true} sizeList={15} />
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}

          <Accordion type="single" collapsible>
            <AccordionItem
              id="accordion-item-product-admin"
              value="item-1"
              className="duration-1000 data-[state=closed]:border-none data-[state=open]:border-slate-500"
            >
              <AccordionTrigger className="font-normal">
                <p>
                  Listagem de todos <strong>Produtos</strong> registrado
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <section className="mt-4 flex flex-1 flex-wrap justify-center gap-2 data-[value=true]:hidden md:justify-start xl:justify-center">
                  <Link href={`/product-manage/update-product/id-test`}>
                    <ProductCardPreviewAdmin />
                  </Link>
                </section>
                <Pagination disableArrowIf={true} sizeList={15} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </section>
    </main>
  )
}
