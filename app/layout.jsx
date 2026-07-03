import localFont from 'next/font/local'
import './globals.css'
import ClientLayout from './client-layout'

const vazirmatn = localFont({
  src: [
    { path: '../public/assets/fonts/Vazirmatn-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/assets/fonts/Vazirmatn-Medium.ttf', weight: '500', style: 'normal' },
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
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" className={vazirmatn.variable} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-parchment dark:bg-space-indigo text-space-indigo dark:text-parchment transition-colors duration-300" style={{ fontFamily: 'var(--font-vazirmatn), sans-serif' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
