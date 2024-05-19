'use client'

import posthog from 'posthog-js'
import { useState } from 'react'

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(true)

  const acceptCookie = () => {
    posthog.opt_in_capturing()
    setShowBanner(false)
  }

  const denyCookie = () => {
    posthog.opt_out_capturing()
    setShowBanner(false)
  }

  return (
    <>
      {showBanner && (
        <div className="mx-auto mt-10 flex w-1/3 flex-col items-center justify-center gap-4">
          <p>Quer biscoito?</p>
          <button onClick={() => acceptCookie()}>sim</button>
          <button onClick={() => denyCookie()}>não</button>
        </div>
      )}
    </>
  )
}
