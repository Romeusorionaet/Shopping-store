import Link from 'next/link'

export function ProductDetailsNotFoundError({ id }: { id: string }) {
  return (
    <div className="w-96 pl-12 pt-48">
      <p className="max-md:test-xs">
        O Produto de endereço: <strong>{id}</strong> não foi encontrado. O
        produto pode ter sido deletado.
      </p>

      <Link href="/product-manage/product-listing" className="mt-4 underline">
        Voltar
      </Link>
    </div>
  )
}
