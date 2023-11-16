"use client";

import Link from "next/link";

import { hasCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE = 1000;

export const CookiesConsent = () => {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    setShowConsent(hasCookie(USER_CONSENT_COOKIE_KEY));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie(USER_CONSENT_COOKIE_KEY, "true", {
      expires: new Date(USER_CONSENT_COOKIE_EXPIRE_DATE),
    });
  };

  if (showConsent) {
    return null;
  }

  return (
    <section
      className="fixed bottom-0 left-0 w-full py-2 md:py-4 mx-auto pl-5 pr-5 z-20"
      data-testid="cookie-consent"
    >
      <div className="flex flex-col items-start px-5 py-3 space-y-2 bg-gray-200 md:flex-row md:space-y-0 md:items-stretch md:space-x-2 rounded-sm">
        <div className="flex items-center flex-grow text-gray-900">
          <p className="text-sm font-medium">
            Usamos cookies para garantir que você obtenha a melhor experiência
            em nosso site.{" "}
            <Link href="/privacy-policy" legacyBehavior>
              <a className="text-sm underline hover:text-lightAccent">
                Política de Privacidade
              </a>
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center" onClick={() => acceptCookie()}>
          <button
            className="p-3 text-sm font-bold text-white uppercase bg-gray-700 whitespace-nowrap rounded-md"
            type="button"
            id="accept"
          >
            Aceitar
          </button>
        </div>
      </div>
    </section>
  );
};
