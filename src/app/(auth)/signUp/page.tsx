import { FormSignUp } from './components/form-sign-up'

export default async function SignOut() {
  return (
    <div className="flex-row-reverse lg:flex">
      <FormSignUp />

      <div className="mt-10 p-4 text-justify max-lg:bg-base_one_reference_header max-lg:text-base_color_text_top lg:w-96">
        <p>
          <strong>Nota</strong>: Ao criar uma conta, você receberá um e-mail com
          um token de confirmação. Verifique sua caixa de entrada para confirmar
          seu endereço de e-mail. Este procedimento é necessário para validar
          seu e-mail.
        </p>
      </div>
    </div>
  )
}
