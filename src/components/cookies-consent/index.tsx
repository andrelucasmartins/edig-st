import { getConsent, setConsent } from "@/app/actions";
import Link from "next/link";

// import { getCookie, hasCookie, setCookie } from "cookies-next";
// import Cookies from "js-cookie";
// import { MouseEvent, useEffect, useState } from "react";

// const USER_CONSENT_COOKIE_KEY = "cookie_consent";
// const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

export async function CookiesConsent() {
  const consent = await getConsent();
  // const [showConsent, setShowConsent] = useState(true);

  // const hasCookies = Cookies.get(USER_CONSENT_COOKIE_KEY) !== undefined;

  // useEffect(() => {
  //   setShowConsent(hasCookies);
  // }, []);

  async function acceptCookie() {
    // setShowConsent(true);
    // cookies().set(USER_CONSENT_COOKIE_KEY, "true", {
    //   expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
    // });
    // Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
    //   expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
    //   secure: true,
    //   sameSite: "strict",
    // });
  }

  if (consent) {
    return null;
  }

  return (
    <section
      className="fixed bottom-0 left-0 w-full py-2 md:py-4 mx-auto pl-5 pr-5 z-20"
      data-testid="cookie-consent"
    >
      <div className="flex flex-col items-start px-5 py-3 space-y-2 bg-gray-200 md:flex-row md:space-y-0 md:items-stretch md:space-x-2 rounded-sm">
        <div className="flex items-center flex-grow text-gray-900">
          <p className="text-sm font-medium" data-testid="description-cookie">
            Usamos cookies para garantir que você obtenha a melhor experiência
            em nosso site.{" "}
            <Link href="/policies/politica-de-privacidade" legacyBehavior>
              <a className="text-sm underline hover:text-lightAccent">
                Política de Privacidade
              </a>
            </Link>
            .
          </p>
        </div>
        <form className="flex items-center" action={setConsent}>
          <button
            className="p-3 text-sm font-bold text-white uppercase bg-gray-700 whitespace-nowrap rounded-md"
            type="submit"
            id="accept"
          >
            Aceitar
          </button>
        </form>
      </div>
    </section>
  );
}
