import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormData } from '../page'
import { z } from 'zod'
import { FormError } from '@/components/form/form-error'
import { Button } from '@/components/ui/button'
import { signInWithEmailAndPassword } from '@/actions/auth/signIn'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@/providers/user-context'

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(6, { message: 'No mínimo 6 digitos' }),
})

export function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const { refetchUserProfile } = useContext(UserContext)
  const { notifyError } = useNotification()

  const router = useRouter()

  async function handleSignInForm(data: LoginFormData) {
    const { email, password } = data

    const response = await signInWithEmailAndPassword({ email, password })

    if (!response.success) {
      notifyError(response.message)
    }

    if (response.success && !isSubmitting) {
      await refetchUserProfile()
      router.push('/')
    }
  }

  return (
    <div>
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
              <div className="h-6 w-6 animate-spin rounded-full border-transparent bg-gradient-to-t from-black via-white to-black" />
            ) : (
              <p>Entrar</p>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
