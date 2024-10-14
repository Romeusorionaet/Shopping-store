import { GraphicTimelineUpdates } from '@/app/(admin)/components/graphics/graphic-timeline-updates'
import Image from 'next/image'
import { CategoryManageHeader } from '../../components/category-manage-header'
import LogoMarcaAsus from '@/assets/img/logo-marca/logo-asus.png'

interface Props {
  params: { id: string }
}

export default function CategoryView({ params }: Props) {
  const { id } = params

  const categoryTimelineData = [
    [
      {
        update: '2024-10-06 13:15:30',
        commit: 'Imagem atualizada.',
        accountable: 'Fulano de tal',
      },
      {
        update: '2024-10-06 12:15:30',
        commit:
          'Correção no nome da categoria de Iphon para Iphone lorem ded ede d ed e de  g rweg  eg qwerf q wef  qwef q wf  qwf q wf qerg e gqrwefgqe rg qwerfgqer gq weg qer gqe rg.',
        accountable: 'Romeu soares',
      },
    ],
    {
      accountable: 'Fulano de tal',
      commit: 'Criação da categoria.',
      createdAt: '2024-10-09 08:47:09',
    },
  ]

  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader categoryId={id} />

      <main className="mt-10 px-1">
        <section className="flex flex-col items-center gap-6">
          <div className="flex gap-2">
            <div className="h-44 w-44 md:h-56 md:w-56">
              <Image
                height={500}
                width={500}
                src={LogoMarcaAsus}
                alt="product image view"
                className="h-full w-full border border-slate-300 object-fill"
              />
            </div>

            <div>
              <p>Nome: Iphone lorem rt juj ddqwdqw dwedwe</p>
              <p>Produtos: 86 unidades</p>
            </div>
          </div>

          <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
            <h2 className="text-xl">Linha do tempo</h2>

            <div className="flex items-end gap-4">
              <GraphicTimelineUpdates data={categoryTimelineData} />
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
