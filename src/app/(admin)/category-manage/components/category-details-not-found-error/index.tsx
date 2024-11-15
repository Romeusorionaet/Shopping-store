import Link from 'next/link'

export function CategoryDetailsNotFoundError({ id }: { id: string }) {
  return (
    <div className="w-96 pl-12 pt-48">
      <p className="max-md:test-xs">
        O item de endereço: <strong>{id}</strong> não foi encontrado. Este item
        pode pode ter sido deletado.
      </p>

      <Link href="/category-manage/category-listing" className="underline">
        Voltar
      </Link>
    </div>
  )
}
