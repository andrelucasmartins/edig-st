"use client"
import Link from "next/link"

import { hasCookie, setCookie } from "cookies-next"

import { useEffect, useState } from "react"

const USER_CONSENT_COOKIE_KEY = "cookie_consent"
const oneYear = 24 * 60 * 60 * 365

export function CookiesConsent() {
  const [showConsent, setShowConsent] = useState(true)

  useEffect(() => {
    setShowConsent(hasCookie(USER_CONSENT_COOKIE_KEY))
  }, [])

  const acceptCookie = () => {
    setShowConsent(true)
    setCookie(USER_CONSENT_COOKIE_KEY, "true", {
      maxAge: oneYear,
    })
  }
  if (showConsent) {
    return null
  }

  return (
    <section className="fixed bottom-0 left-0 z-20 mx-auto w-full py-2 pl-5 pr-5 md:py-4" data-testid="cookie-consent">
      <div className="flex flex-col items-start space-y-2 rounded-sm bg-gray-200 px-5 py-3 md:flex-row md:items-stretch md:space-x-2 md:space-y-0">
        <div className="flex flex-grow items-center text-gray-900">
          <p className="text-sm font-medium" data-testid="description-cookie">
            Usamos cookies para garantir que você obtenha a melhor experiência em nosso site.{" "}
            <Link href="/policies/politica-de-privacidade" legacyBehavior>
              <a className="hover:text-lightAccent text-sm underline">Política de Privacidade</a>
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => acceptCookie()}
            className="whitespace-nowrap rounded-md bg-gray-700 p-3 text-sm font-bold uppercase text-white"
            type="submit"
            id="accept"
          >
            Aceitar
          </button>
        </div>
      </div>
    </section>
  )
}
