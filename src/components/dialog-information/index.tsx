'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export function DialogInformation() {
  const [userConsent, setUserConsent] = useState(false)

  useEffect(() => {
    const localStorageConsent = localStorage.getItem(
      '@shopping-store/user-consent.2.0',
    )
    if (localStorageConsent === 'true') {
      setUserConsent(true)
    } else {
      setUserConsent(false)
    }
  }, [userConsent])

  const handleAcceptConsent = () => {
    setUserConsent(true)
    localStorage.setItem('@shopping-store/user-consent.2.0', 'true')
  }

  return (
    <div
      data-value={userConsent}
      className="fixed bottom-0 left-0 z-30 flex w-full items-center justify-center text-sm data-[value=true]:hidden md:text-base"
    >
      <div className="w-full space-y-8 border bg-base_color_text_top p-4 md:w-1/2">
        <p>
          Este e-commerce está em fase de desenvolvimento e é destinado
          exclusivamente para fins de portfólio. O objetivo é demonstrar minhas
          habilidades como programador web.
        </p>

        <p>
          Acesse meu{' '}
          <a href="https://romeuportfolio.netlify.app" className="underline">
            Portfólio
          </a>{' '}
          para visualizar mais projetos.
        </p>

        <Button
          onClick={() => handleAcceptConsent()}
          className="hover:text-base_color_text_top"
        >
          OK
        </Button>
      </div>
    </div>
  )
}
