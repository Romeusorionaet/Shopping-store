import { Suspense } from 'react'
import { HandleConfirmEmail } from './components/handle-confirm-email'

export default function ConfirmEmail() {
  return (
    <div className=" pl-4 pt-28">
      <div className="items-center justify-center gap-8 text-center md:flex">
        <h1 className="mb-2 font-bold">Confirme seu email</h1>

        <Suspense>
          <HandleConfirmEmail />
        </Suspense>
      </div>
    </div>
  )
}
