import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { useState } from 'react'

interface DialogConfirmProps {
  onConfirm: () => Promise<void>
}

export function DialogConfirmOrNot({ onConfirm }: DialogConfirmProps) {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

  const handleConfirmation = () => {
    setIsOpen(false)
    onConfirm()
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="bg-base_color_negative/70 p-1 rounded-md hover:bg-base_color_negative duration-700"
      >
        <Trash size={28} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você está certo disso?</DialogTitle>
        </DialogHeader>

        <p>
          Todos os produtos associados a esta categoria também serão excluídos.
          pois não possuem uma categoria associada a eles.
        </p>

        <DialogFooter>
          <div className="flex gap-8 justify-between">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button onClick={handleConfirmation}>Confirmar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
