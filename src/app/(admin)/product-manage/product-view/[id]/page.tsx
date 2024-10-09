import { ProductManageHeader } from '../../components/product-manage-header'

interface Props {
  params: { id: string }
}

export default function ProductView({ params }: Props) {
  const { id } = params

  return (
    <div className="ml-12 w-full pt-32">
      <ProductManageHeader productId={id} />
    </div>
  )
}
