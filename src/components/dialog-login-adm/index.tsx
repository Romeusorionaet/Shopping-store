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
import { verificationAdm } from '@/actions/verification-adm'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

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
      const response = await verificationAdm(password)

      if (response?.messageError) {
        notifyError(response.messageError)
      }

      if (response?.token) {
        Cookies.set('@shopping-store/accessToken', response.token, {
          expires: 1 / 24,
        })
        navigate.push('/control-adm')
      }
    } catch (error) {
      console.error('Erro ao autenticar')
    }
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insira sua senha</DialogTitle>
        </DialogHeader>

        <p>Apenas administrador tem acesso a essa tela.</p>

        <DialogFooter>
          <Input
            className="text-white"
            placeholder="***"
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
