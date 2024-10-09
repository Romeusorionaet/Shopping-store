import { ProductManageHeader } from '../components/product-manage-header'
import { ProductForm } from '../components/product-form/form'
import { ButtonFormProduct } from '../components/product-form/button-form-product'

export default function RegisterProduct() {
  return (
    <div className="ml-12 w-full pt-32">
      <ProductManageHeader />

      <main>
        <section className="my-10 px-1">
          <h2 className="text-lg font-medium">Registrar um novo produto</h2>

          <section className="my-10">
            <ProductForm />

            <div className="mt-20 flex justify-center">
              <ButtonFormProduct />
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
