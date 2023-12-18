import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CookiesConsent } from "@/components/cookies-consent";
import Navbar from "@/components/layout/navbar";
import { Heart, Package2, ShoppingCart } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://store.aedigi.com.br/"),
  title: "AE Digi Store",
  description: "O melhor lugar para você fazer suas compras",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        <!-- Meta Pixel Code -->
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '5345036705619889');
        fbq('track', 'PageView');
        <!-- End Meta Pixel Code -->
      `,
        }}
      />
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <div className="bg-gray-900">
              <p className="mx-auto  flex  max-w-7xl items-center justify-between px-4 py-2 text-sm font-medium text-white sm:px-6 lg:px-8">
                <span className="hidden select-none items-center justify-between gap-2  sm:flex">
                  <ShoppingCart /> Trocas e Devoluções em até 7 dias
                </span>
                <span className="flex select-none items-center justify-between gap-2">
                  <Package2 /> Frete Grátis para todo o Brasil
                </span>
                <span className="hidden select-none items-center justify-between gap-2  sm:flex">
                  <Heart /> Satisfação Garantida ou Dinheiro de Volta
                </span>
              </p>
            </div>
            <Navbar />
            <Header />
            <Suspense>
              <main>{children}</main>
            </Suspense>
            <CookiesConsent />
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  );
}
