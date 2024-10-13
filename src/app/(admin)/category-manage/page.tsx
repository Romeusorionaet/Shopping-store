import { AlertCircle, SquareStack } from 'lucide-react'
import Link from 'next/link'
import { GraphicTimelineUpdates } from '../components/graphics/graphic-timeline-updates'
import { GraphicBarCategoryProducts } from '../components/graphics/graphic-bar-category-products'

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
      <section className="flex h-28 w-full items-center justify-evenly gap-10 border-b border-b-base_one_reference_header/20 bg-base_color_text_top md:justify-evenly">
        <Link
          href="/category-manage"
          className="group flex items-end gap-2 rounded-lg border border-base_color_dark/10 p-1 duration-500 hover:bg-base_one_reference_header"
        >
          <SquareStack
            color="white"
            className="h-6 w-6 rounded-lg bg-base_color_dark p-1 md:h-8 md:w-8"
          />
          <h1 className="duration-500 group-hover:text-base_color_text_top max-md:text-sm">
            Categoria
          </h1>
        </Link>

        <div className="flex items-end gap-2">
          <p className="max-md:hidden">Overview</p>
          <AlertCircle className="h-6 w-6" />
        </div>
      </section>

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
