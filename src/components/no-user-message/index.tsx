import { UserMinus } from 'lucide-react'

export function NoUserMessage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-4 rounded-md flex flex-col items-center gap-4">
        <UserMinus size={44} />
        <p>Sem usuário logado</p>
      </div>
    </div>
  )
}
