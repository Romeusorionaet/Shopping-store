import { ProductFormWithPreview } from '../components/product-form-with-preview/page'
import { ProductManageHeader } from '../components/product-manage-header'

export default function RegisterProduct() {
  return (
    <main className="ml-12 w-full pt-44">
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
      </section>

      <section className="my-10 px-1">
        <h2 className="text-lg font-medium">Registrar um novo produto</h2>

        <div className="my-10 space-y-10">
          <ProductFormWithPreview />
        </div>
      </section>
    </main>
  )
}
