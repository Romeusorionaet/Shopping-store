'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormError } from '@/components/form/form-error'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { signUp } from '@/actions/auth/sign-up'

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Nome obrigatório' }),
  email: z.string().min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(6, { message: 'No mínimo 6 digitos' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const { notifyError } = useNotification()

  const router = useRouter()

  // TODO repetir senha para confirmar se esta correto
  async function handleSignInForm(data: LoginFormData) {
    const { username, email, password } = data

    const response = await signUp({
      username,
      email,
      password,
    })

    if (!response.success) {
      notifyError(response.message)
    }

    if (response.success && !isSubmitting) {
      router.push('/signIn')
    }
  }

  function handleNavigateToSignIn() {
    router.push('/signIn')
  }

  return (
    <motion.div
      className="mx-auto mt-28 w-[90vw] max-w-[450px] rounded-xl bg-base_color_text_top p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="mb-4 text-center font-bold uppercase text-base_one_reference_header">
        Criar conta
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
        <fieldset className="flex flex-col gap-6">
          <label className="flex flex-col" htmlFor="username">
            Nome completo
            <input
              id="username"
              placeholder="Nome e sobrenome"
              className="p-2"
              {...register('username')}
            />
            <FormError errors={errors.username?.message} />
          </label>

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
              <div className="h-6 w-6 animate-spin rounded-full border-transparent bg-gradient-to-t from-black via-white to-black" />
            ) : (
              <p>Criar</p>
            )}
          </Button>
        </div>
      </form>

      <Separator className="my-8 opacity-20" />

      <div className="mt-4 flex justify-center">
        <Button
          type={'button'}
          variant="ghost"
          onClick={handleNavigateToSignIn}
          className="w-full gap-4 font-semibold hover:bg-base_one_reference_header hover:text-base_color_text_top"
        >
          Voltar a tela de login
        </Button>
      </div>
    </motion.div>
  )
}
