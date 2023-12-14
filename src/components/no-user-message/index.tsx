import { UserMinus } from 'lucide-react'

export function NoUserMessage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-md p-4">
        <UserMinus size={44} />
        <p>Sem usuário logado</p>
      </div>
    </div>
  )
}
