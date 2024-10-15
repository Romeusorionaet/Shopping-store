import { PackageX } from 'lucide-react'

interface Props {
  type: 'CATEGORY' | 'PRODUCT'
}

export function NoRegistrationMessage({ type }: Props) {
  const messageType = type === 'CATEGORY' ? 'catálogo' : 'produto'

  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-4 p-4">
      <PackageX size={44} />
      <p>Sem {messageType} cadastrado ainda.</p>
    </div>
  )
}
