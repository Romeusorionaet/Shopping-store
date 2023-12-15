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

  // fazer uso desse componente

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-base_color_negative/70 p-1 duration-700 hover:bg-base_color_negative"
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
          <div className="flex justify-between gap-8">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button onClick={handleConfirmation}>Confirmar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
