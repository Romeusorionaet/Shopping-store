import { Input } from '@/components/ui/input'
import { GraphicBarProductsLikes } from '../components/graphics/graphic-bar-products-likes'
import { GraphicBarQuantitySold } from '../components/graphics/graphic-bar-quantity-sold'
import { GraphicBarStockProduct } from '../components/graphics/graphic-bar-stock-product'
import { ProductManageHeader } from './components/product-manage-header'
import { GraphicTimelineProducts } from '../components/graphics/graphic-timeline-products'

export default function ProductManage() {
  const categories = [{ title: 'Samsung' }, { title: 'Motorola' }]

  const productStockData = [
    { title: 'Produto A', stock: 9 },
    { title: 'Produto B', stock: 5 },
    { title: 'Produto C', stock: 58 },
    { title: 'Produto D', stock: 250 },
    ...Array.from({ length: 50 }, (_, i) => ({
      title: `Produto ${String.fromCharCode(69 + (i % 26))}`,
      stock: Math.floor(Math.random() * 300) + 50,
    })),
  ]

  const productSoldData = [
    { title: 'Produto A', quantitySold: 9 },
    { title: 'Produto B', quantitySold: 5 },
    { title: 'Produto C', quantitySold: 58 },
    { title: 'Produto D', quantitySold: 250 },
    ...Array.from({ length: 50 }, (_, i) => ({
      title: `Produto ${String.fromCharCode(69 + (i % 26))}`,
      quantitySold: Math.floor(Math.random() * 300) + 50,
    })),
  ]

  const productsLikesData = [
    { title: 'Produto A', like: 1 },
    { title: 'Produto A', like: 0 },
    { title: 'Produto B', like: 5 },
    { title: 'Produto C', like: 58 },
    { title: 'Produto D', like: 250 },
    ...Array.from({ length: 50 }, (_, i) => ({
      title: `Produto ${String.fromCharCode(69 + (i % 26))}`,
      like: Math.floor(Math.random() * 300) + 50,
    })),
  ]

  const defaultDate = new Date().toISOString().split('T')[0]
  const defaultDateTimeline = new Date().toISOString().slice(0, 7)

  const productsTimelineData = [
    {
      accountable: 'Romeu soares',
      name: 'Produto A',
      commit:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quisquam quasi sequi sit maiores molestias similique, quibusdam porro quam quae doloremque est neque nihil odio modi recusandae voluptates, eveniet iure.',
      createdAt: '2024-10-05 15:11:02',
      updatedAt: '2024-10-06 13:15:30',
    },
    {
      accountable: 'Romeu soares',
      name: 'Produto B',
      commit:
        ' ipsum dolor, sit amet consectetur adipisicing elit. Alias quisquam.',
      createdAt: '2024-10-05 11:11:02',
      updatedAt: '2024-10-06 12:15:30',
    },
    {
      accountable: 'Romeu soares',
      name: 'Produto C',
      commit:
        ' ipsum dolor, sit amet consectetur adipisicing elit. Alias quisquam.',
      createdAt: '2024-10-09 08:47:09',
      updatedAt: '2024-10-09 09:00:00',
    },
  ]

  return (
    <div className="ml-12 w-full overflow-x-hidden pt-32">
      <ProductManageHeader />

      <main className="pb-20">
        <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <div>
            <h2 className="text-xl">Controle de estoque do produto</h2>
            <p>A visualização do estoque é por categoria.</p>
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
            <GraphicBarStockProduct
              data={productStockData}
              title="Quantidade de Produtos em Estoque"
              threshold={10}
              category="Samsung"
            />
          </div>
        </section>

        <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <div>
            <h2 className="text-xl">Produto vendidos</h2>
            <p>
              Visualize a quantidade de produtos por categoria, que foram
              vendidos durante uma data definida.
            </p>
          </div>

          <div className="flex gap-6">
            <select
              defaultValue="Samsung"
              className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
            >
              <option value="">Selecione</option>
              {categories.map((category, index) => (
                <option key={index}>{category.title}</option>
              ))}
            </select>

            <Input
              type="date"
              defaultValue={defaultDate.toString()}
              className="w-44 bg-transparent"
            />
          </div>

          <div className="flex items-end gap-4">
            <GraphicBarQuantitySold
              data={productSoldData}
              title="Quantidade de Produtos vendidos"
              category="Samsung"
            />
          </div>
        </section>

        <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <div>
            <h2 className="text-xl">Curtidas do Produto</h2>
            <p>Analize de curtidas no produtos por categoria.</p>
          </div>

          <div className="flex gap-6">
            <select
              defaultValue="Samsung"
              className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
            >
              <option value="">Selecione</option>
              {categories.map((category, index) => (
                <option key={index}>{category.title}</option>
              ))}
            </select>

            <select
              defaultValue="bigger"
              className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
            >
              <option value="">Selecione</option>
              <option value="bigger">Mais curtidos</option>
              <option value="minor">Menos curtidos</option>
            </select>
          </div>

          <div className="flex items-end gap-4">
            <GraphicBarProductsLikes
              data={productsLikesData}
              title="Quantidade de Produtos"
              category="Samsung"
              orderType="bigger"
            />
          </div>
        </section>

        <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <h2 className="text-xl">
            Linha do tempo <span className="text-sm font-light">(por mês)</span>
          </h2>

          <Input
            type="month"
            defaultValue={defaultDateTimeline.toString()}
            className="w-44 bg-transparent"
          />

          <div className="flex items-end gap-4">
            <GraphicTimelineProducts data={productsTimelineData} />
          </div>
        </section>
      </main>
    </div>
  )
}
