'use client'

import posthog from 'posthog-js'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(true)

  // useEffect(() => {
  //   const cookieConsent = Cookie.get(
  //     'ph_phc_OS2QK5QdzW0ubfk0Ft9hG9fgwXcqaEr9KwVRspxLZPb_posthog',
  //   )

  //   if (cookieConsent) {
  //     setShowBanner(false)
  //   }
  // }, [])

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
