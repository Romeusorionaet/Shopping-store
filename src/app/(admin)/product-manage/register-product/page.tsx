import { AlertCircle, Package } from 'lucide-react'
import { ProductCardAdmin } from '../../components/product-card-admin'
import { Pagination } from '@/components/pagination'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import '@/assets/styles/components/accordion.css'
import { CategoryCardAdmin } from '../../components/category-card-admin'

export default function RegisterProduct() {
  return (
    <main className="ml-12 w-full pt-44">
      <section className="fixed left-0 top-24 z-10 flex h-28 w-full items-center justify-evenly gap-10 bg-base_color_text_top md:justify-evenly">
        <div className="flex items-end gap-2">
          <Package
            color="white"
            className="rounded-lg bg-base_color_dark p-1"
            size={30}
          />
          <p>Produto</p>
        </div>

        <div className="flex items-end gap-2">
          <p className="max-md:hidden">Gerenciamento</p>
          <AlertCircle />
        </div>
      </section>

      <section className="mt-10 px-1">
        <section className="flex h-full w-full justify-center gap-6 rounded-lg max-md:flex-wrap">
          <div className="h-[400px] w-full max-w-[600px] rounded-lg bg-blue-200">
            <p>Exibir outros dados</p>
          </div>
          <div className="h-[400px] w-full max-w-[600px] rounded-lg bg-pink-200">
            <p>Exibir outros dados</p>
          </div>
        </section>

        <section className="mb-10">
          <Accordion type="single" collapsible>
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
          </Accordion>

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
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
                  <ProductCardAdmin />
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
