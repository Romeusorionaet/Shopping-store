'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormError } from '@/components/form/form-error'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/use-notifications'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { signUp } from '@/actions/auth/sign-up'
import ClipLoader from 'react-spinners/ClipLoader'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UploadButton } from '@/utils/generate-components'
import { useState } from 'react'
import { User } from 'lucide-react'
import { signUpFormSchema } from '@/schemas/form-sign-up'

interface ImageProfileProps {
  name: string
  url: string
}

type LoginFormData = z.infer<typeof signUpFormSchema>

export function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  const [imageProfile, setImageProfile] = useState<ImageProfileProps[]>([
    {
      name: '',
      url: '',
    },
  ])

  const { notifyError, notifySuccess } = useNotification()

  const router = useRouter()

  const hasImageProfile = !!imageProfile[0].url

  async function handleSignInForm(data: LoginFormData) {
    const { username, email, password } = data

    if (!hasImageProfile) {
      notifyError({
        message: 'Selecione uma imagem para o seu perfil',
        origin: 'client',
      })

      return
    }

    const response = await signUp({
      username,
      email,
      password,
      picture: imageProfile[0].url,
    })

    if (!response.success) {
      notifyError({ message: response.message, origin: 'server' })
    }

    if (response.success && !isSubmitting) {
      handleNavigateToSignIn()
    }
  }

  const handleNavigateToSignIn = () => {
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
        <div className="flex items-center justify-center gap-4">
          <Avatar
            data-value={hasImageProfile}
            className="h-16 w-16 border border-base_color_dark/30 bg-base_one_reference_header data-[value=false]:opacity-30"
          >
            {hasImageProfile ? (
              <>
                <AvatarImage src={imageProfile[0].url} />
                <AvatarFallback>{imageProfile[0].name}</AvatarFallback>
              </>
            ) : (
              <div className="flex w-full items-center justify-center">
                <User className="text-white" size={40} />
              </div>
            )}
          </Avatar>

          <div
            data-value={!hasImageProfile}
            className="data-[value=false]:hidden"
          >
            <UploadButton
              className="mt-4 ut-button:bg-base_one_reference_header ut-button:ut-uploading:bg-red-500/50"
              endpoint="imageProfileShoppingStore"
              onClientUploadComplete={(res) => {
                res && setImageProfile(res)
                notifySuccess({
                  message: 'Imagem do perfil salvo',
                  origin: 'client',
                })
              }}
              onUploadError={(error: Error) => {
                notifyError({ message: error.message, origin: 'client' })
              }}
            />
          </div>
        </div>

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

          <label className="flex flex-col" htmlFor="passwordRepeat">
            Repetir senha
            <input
              type="password"
              id="passwordRepeat"
              placeholder="******"
              className="p-2"
              {...register('passwordRepeat')}
            />
            <FormError errors={errors.passwordRepeat?.message} />
          </label>
        </fieldset>

        <div className="flex  justify-center">
          <Button
            type="submit"
            className="group w-60 gap-4 font-semibold hover:bg-base_one_reference_header hover:text-base_color_text_top"
          >
            {isSubmitting ? (
              <ClipLoader loading={isSubmitting} size={35} />
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
