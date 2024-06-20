import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { useState } from 'react'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'

interface Props {
  isDialogOpen: boolean | undefined
  handleCancel: () => void
}

export function DialogLoginAdm({ isDialogOpen, handleCancel }: Props) {
  const [password, setPassword] = useState('')
  const { notifyError } = useNotification()

  const navigate = useRouter()

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    try {
      if (!password) {
        notifyError({ message: 'Campo vazio', origin: 'client' })
        return
      }

      // const response = await verificationAdm(password)

      // if (response?.messageError) {
      //   setPassword('')
      //   notifyError(response.messageError)
      // }

      // if (response?.token) {
      //   Cookies.set('@shopping-store/accessToken', response.token, {
      //     expires: 1 / 24,
      //   })
      //   handleCancel()
      //   navigate.push('/control-adm')
      // }
    } catch (error) {
      console.error('Erro ao autenticar')
    }
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insira sua chave</DialogTitle>
        </DialogHeader>

        <p>Apenas administrador tem acesso a essa tela.</p>

        <DialogFooter className="flex flex-col gap-4">
          <Input
            className="text-white"
            placeholder="***"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="flex justify-between gap-8">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button onClick={handleLogin}>Enviar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
