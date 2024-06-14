'use client'

import { motion } from 'framer-motion'
import { z } from 'zod'
import { FormSignIn, loginFormSchema } from './components/form-sign-in'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useNotification } from '@/hooks/use-notifications'

export type LoginFormData = z.infer<typeof loginFormSchema>

export default function SignIn() {
  const { notifyError } = useNotification()

  const router = useRouter() // TODO criar component

  function handleNavigateToSignUp() {
    router.push('/signUp')
  }

  const handleLoginWithGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (err: any) {
      notifyError(
        'Houve um problema ao realizar o login. Reporte esse erro e tente novamente mais tarde.',
      )
    }
  }

  return (
    <motion.div
      className="mx-auto mb-4 mt-28 w-[90vw] max-w-[450px] rounded-xl bg-base_color_text_top p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="mb-8">Fazer login</h1>

      <div className="space-y-6">
        <FormSignIn />

        <div className="flex  justify-center">
          <Button
            size="icon"
            variant="outline"
            onClick={handleLoginWithGoogle}
            className="w-60 gap-4 font-semibold hover:bg-base_one_reference_header hover:text-base_color_text_top"
          >
            Entrar com Google
          </Button>
        </div>

        <Separator className="opacity-20" />

        <p className="text-center underline">Esqueci a senha</p>
      </div>
    </motion.div>
  )
}
