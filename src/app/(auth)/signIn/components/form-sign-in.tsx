'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { FormError } from '@/components/form/form-error'
import { Button } from '@/components/ui/button'
import { signInWithEmailAndPassword } from '@/actions/auth/signIn'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@/providers/user-context'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { Separator } from '@/components/ui/separator'
import ClipLoader from 'react-spinners/ClipLoader'
import { signInFormSchema } from '@/schemas/form-sign-in'

type LoginFormData = z.infer<typeof signInFormSchema>

export function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  // TODO Fazer com que a api quando dispertar, emitir algum sinal
  // para o front para eu poder fazer lógica de permitir
  // user logar se a api sair da hibernação
  // da forma que está, como a api hiberna e se o user tentar fazer
  // login por exemplo pelo google, ele irá ver um erro

  const { refetchUserProfile } = useContext(UserContext)

  const { notifyError } = useNotification()

  const router = useRouter()

  async function handleSignInForm(data: LoginFormData) {
    const { email, password } = data

    const response = await signInWithEmailAndPassword({ email, password })

    if (!response.success) {
      notifyError({ message: response.message, origin: 'server' })
      return
    }

    if (response.success && !isSubmitting) {
      await refetchUserProfile()

      router.push('/')
    }
  }

  function handleNavigateToSignUp() {
    router.push('/signUp')
  }

  const handleLoginWithGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (err) {
      notifyError({
        message:
          'Houve um problema ao realizar o login. Reporte esse erro e tente novamente mais tarde',
        origin: 'client',
      })
    }
  }

  return (
    <motion.div
      className="mx-auto mt-10 w-[90vw] max-w-[450px] rounded-xl bg-base_color_text_top p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none md:mt-28"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="mb-4 text-center font-bold uppercase text-base_one_reference_header">
        Fazer login
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
        <fieldset className="flex flex-col gap-6">
          <label className="flex flex-col" htmlFor="email">
            Email
            <input
              id="email"
              placeholder="pedro@gmail.com"
              className="p-2"
              {...register('email')}
            />
            <FormError errors={errors.email?.message} />
          </label>

          <label className="flex flex-col" htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              placeholder="******"
              className="p-2"
              {...register('password')}
            />
            <FormError errors={errors.password?.message} />
          </label>
        </fieldset>

        <div className="flex  justify-center">
          <Button
            type="submit"
            className="w-60 gap-4 font-semibold hover:bg-base_one_reference_header hover:text-base_color_text_top"
          >
            {isSubmitting ? (
              <ClipLoader loading={isSubmitting} size={35} />
            ) : (
              <p>Entrar</p>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4 flex justify-center">
        <Button
          type={'button'}
          size="icon"
          variant="outline"
          onClick={handleLoginWithGoogle}
          className="w-60 gap-4 font-semibold hover:bg-base_one_reference_header hover:text-base_color_text_top"
        >
          Entrar com Google
        </Button>
      </div>

      <Separator className="my-8 opacity-20" />

      <Button
        variant="ghost"
        onClick={handleNavigateToSignUp}
        className="w-full text-center hover:bg-base_one_reference_header"
      >
        Criar conta
      </Button>
    </motion.div>
  )
}
