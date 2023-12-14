import { PackageX } from 'lucide-react'

export function NoProductRegistrationMessage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
      <PackageX size={44} />
      <p>
        Nenhum produto foi cadastrado ainda. Por favor, aguarde, em breve
        teremos produtos cadastrados.
      </p>
    </div>
  )
}
