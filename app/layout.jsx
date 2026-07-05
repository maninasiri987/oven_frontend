import { cookies } from 'next/headers'
import localFont from 'next/font/local'
import './globals.css'
import ClientLayout from './client-layout'

const vazirmatn = localFont({
  src: [
    { path: '../public/assets/fonts/Vazirmatn-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/assets/fonts/Vazirmatn-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-vazirmatn',
})

export const metadata = {
  title: 'Oven - طراحی سایت',
  description: 'طراحی سایت حرفه‌ای با اوون',
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
    <html lang="fa" className={`${vazirmatn.variable} ${themeClass} overflow-y-auto`} suppressHydrationWarning>
      <body className="min-h-screen bg-parchment dark:bg-space-indigo text-space-indigo dark:text-parchment transition-colors duration-300" style={{ fontFamily: 'var(--font-vazirmatn), sans-serif' }}>
        {!themeCookie && (
          <style>{`@media(prefers-color-scheme:dark){body{background-color:#0a0908;color:#eae0d5}}`}</style>
        )}
        <ClientLayout initialTheme={themeCookie?.value}>{children}</ClientLayout>
      </body>
    </html>
  )
}
