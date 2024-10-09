import { ProductManageHeader } from './components/product-manage-header'

export default function ProductManage() {
  return (
    <div className="ml-12 w-full pt-32">
      <ProductManageHeader />

      <main>
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
      </main>
    </div>
  )
}
