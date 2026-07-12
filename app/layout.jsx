import { cookies } from 'next/headers'
import localFont from 'next/font/local'
import './globals.css'
import ClientLayout from './client-layout'

const vazirmatn = localFont({
  src: [
    { path: '../public/assets/fonts/Vazirmatn-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-vazirmatn',
})

export const metadata = {
  title: {
    default: 'طراحی سایت اوون وب — طراحی مدرن و حرفه‌ای | oven',
    template: '%s | اوون وب',
  },
  description: 'طراحی سایت اختصاصی، سئو حرفه‌ای و توسعه وب با تمرکز بر سرعت، تجربه کاربری و رشد واقعی کسب‌وکار. با Oven وب‌سایتی مدرن، سریع و بهینه برای موتورهای جستجو داشته باشید.',
  keywords: ['طراحی سایت', 'طراحی وب سایت', 'سئو', 'بهینه سازی سایت', 'وردپرس', 'نیکست جی‌اس', 'توسعه وب', 'Oven', 'طراحی سایت حرفه‌ای'],
  metadataBase: new URL('https://ovenweb.vercel.app'),
  alternates: {
    canonical: 'https://ovenweb.vercel.app',
  },
  openGraph: {
    title: 'طراحی سایت اوون وب — طراحی مدرن و حرفه‌ای | oven',
    description: 'طراحی سایت اختصاصی، سئو حرفه‌ای و توسعه وب با تمرکز بر سرعت، تجربه کاربری و رشد واقعی کسب‌وکار. با Oven وب‌سایتی مدرن، سریع و بهینه برای موتورهای جستجو داشته باشید.',
    url: 'https://ovenweb.vercel.app',
    siteName: 'اوون وب',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://ovenweb.vercel.app/og-telegram.png',
        width: 1200,
        height: 630,
        alt: 'Oven - طراحی سایت حرفه‌ای',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'طراحی سایت اوون وب — طراحی مدرن و حرفه‌ای | oven',
    description: 'طراحی سایت اختصاصی، سئو حرفه‌ای و توسعه وب با تمرکز بر سرعت، تجربه کاربری و رشد واقعی کسب‌وکار. با Oven وب‌سایتی مدرن، سریع و بهینه برای موتورهای جستجو داشته باشید.',
    images: ['https://ovenweb.vercel.app/og-telegram.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('oven-theme')
  const themeClass = themeCookie?.value === 'dark' ? 'dark' : ''

  return (
    <html lang="fa" className={`${vazirmatn.variable} ${themeClass} overflow-y-auto`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'اوون وب',
              url: 'https://ovenweb.vercel.app',
              logo: 'https://ovenweb.vercel.app/assets/logo.webp',
              description: 'طراحی سایت حرفه‌ای، سریع و مدرن',
              sameAs: ['https://t.me/ovenweb'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'اوون وب',
              alternateName: 'oven',
              url: 'https://ovenweb.vercel.app',
              inLanguage: 'fa-IR',
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-parchment dark:bg-space-indigo text-space-indigo dark:text-parchment transition-colors duration-300" style={{ fontFamily: 'var(--font-vazirmatn), sans-serif' }}>
        {!themeCookie && (
          <style>{`@media(prefers-color-scheme:dark){body{background-color:#0a0908;color:#eae0d5}}`}</style>
        )}
        <ClientLayout initialTheme={themeCookie?.value}>{children}</ClientLayout>
      </body>
    </html>
  )
}
