import { GraphicBar } from './components/graphics/graphic-bar'
import { ProductManageHeader } from './components/product-manage-header'

export default function ProductManage() {
  const categories = [{ title: 'Samsung' }, { title: 'Motorola' }]

  const productData = [
    { title: 'Produto A', stock: 9 },
    { title: 'Produto B', stock: 5 },
    { title: 'Produto C', stock: 58 },
    { title: 'Produto D', stock: 250 },
    ...Array.from({ length: 50 }, (_, i) => ({
      title: `Produto ${String.fromCharCode(69 + (i % 26))}`,
      stock: Math.floor(Math.random() * 300) + 50,
    })),
  ]

  return (
    <div className="ml-12 w-full overflow-x-hidden pt-32">
      <ProductManageHeader />

      <main>
        <section className="mt-28 px-1">
          <div className="flex h-full w-full flex-col justify-center gap-6 rounded-lg max-md:flex-wrap">
            <div>
              <h2 className="text-xl">Controle de estoque do produto</h2>
              <p>A visualização do estoque é por categoria</p>
            </div>

            <select
              defaultValue="Samsung"
              className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
            >
              <option value="">Selecione</option>
              {categories.map((category, index) => (
                <option key={index}>{category.title}</option>
              ))}
            </select>

            <div className="flex items-end gap-4">
              <GraphicBar
                data={productData}
                title="Quantidade de Produtos em Estoque"
                threshold={10}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
