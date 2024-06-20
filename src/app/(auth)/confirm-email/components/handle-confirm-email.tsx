'use client'

import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/use-notifications'
import { api } from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { NotFoundTokenError } from './not-found-token-error'

export function HandleConfirmEmail() {
  const { notifyError } = useNotification()
  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return <NotFoundTokenError />
  }

  const handleConfirmEmailAndNavigateToSignIn = async () => {
    try {
      const response = await api.post(`/auth/confirm-email/${token}`)

      if (response.data.success) {
        router.push('/signIn')
      }
    } catch (err: any) {
      const errorMessageFromServer = `Error: ${err.response.data.error} / Error path: ${err.response.data.error_path[0]}`

      notifyError(errorMessageFromServer)
    }
  }

  return (
    <Button
      className="hover:text-base_color_text_top max-md:mt-8"
      disabled={!token}
      onClick={handleConfirmEmailAndNavigateToSignIn}
    >
      Confirmar
    </Button>
  )
}
