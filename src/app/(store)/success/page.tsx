import Link from 'next/link'

export default async function Success() {
  return (
    <div className="flex items-center justify-center pt-44">
      <p> deu tudo certo</p>
      <Link href={'/orders'}>Visualizar pedidos</Link>
    </div>
  )
}
