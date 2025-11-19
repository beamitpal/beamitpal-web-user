import "./globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { viewport as siteViewport, META_THEME_COLORS } from "@/config/site/static";
import { buildMetadata } from "@/config/site/server";
import { getWebSiteJsonLd } from "@/config/site/schema";
import { Providers } from "@/theme/theme-provider";
import { fontMono, fontSans } from "@/lib/fonts";

export const viewport: Viewport = siteViewport;


export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}
  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Beamitpal" />
        <meta
          name="facebook-domain-verification"
          content="tj0pjg153st7d8b6o9tdvs9jsssf8v"
        />
        <meta name='dmca-site-verification' content='Wnh5RU9vWk1kWFhBZEZPdmM0R2h2Zz090' />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
