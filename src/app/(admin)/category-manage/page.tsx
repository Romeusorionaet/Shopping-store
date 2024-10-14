import { GraphicTimelineUpdates } from '../components/graphics/graphic-timeline-updates'
import { GraphicBarCategoryProducts } from '../components/graphics/graphic-bar-category-products'
import { CategoryManageHeader } from './components/category-manage-header'

export default function CategoryManage() {
  const categoryProductsData = [
    { title: 'Categoria A', products: 9 },
    { title: 'Categoria B', products: 5 },
    { title: 'Categoria C', products: 58 },
    { title: 'Categoria D', products: 250 },
    ...Array.from({ length: 50 }, (_, i) => ({
      title: `Categoria ${String.fromCharCode(69 + (i % 26))}`,
      products: Math.floor(Math.random() * 300) + 50,
    })),
  ]

  const categoryTimelineData = [
    [
      {
        update: '2024-10-06 13:15:30',
        commit: 'Correção do nome da categoria.',
        accountable: 'Fulano de tal',
      },
      {
        update: '2024-10-06 12:15:30',
        commit:
          'lorem ded ede d ed e de  g rweg  eg qwerf q wef  qwef q wf  qwf q wf qerg e gqrwefgqe rg qwerfgqer gq weg qer gqe rg.',
        accountable: 'Romeu soares',
      },
    ],
    {
      accountable: 'Fulano de tal',
      commit: 'Criação do categoria.',
      createdAt: '2024-10-09 08:47:09',
    },
  ]

  return (
    <div className="ml-12 w-full overflow-x-hidden pt-32">
      <CategoryManageHeader />

      <main className="px-1 pb-20">
        <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <h2 className="text-xl">Quantidade de produtos por estoque</h2>

          <div className="flex items-end gap-4">
            <GraphicBarCategoryProducts
              data={categoryProductsData}
              title="Todas as categoria e sua quantidade de produtos registrados"
            />
          </div>
        </section>

        <section className="mt-10 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <h2 className="text-xl">Linha do tempo</h2>

          <div className="flex items-end gap-4">
            <GraphicTimelineUpdates data={categoryTimelineData} />
          </div>
        </section>
      </main>
    </div>
  )
}
