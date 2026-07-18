'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import useTheme from '@/hooks/useTheme'
import { MobileProvider } from '@/contexts/MobileContext'
import LoadingBar from '@/components/LoadingBar'
import RevealInit from '@/components/RevealInit'

const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <header className="fixed z-30 left-1/2 -translate-x-1/2 top-2 h-16 w-full" />,
})

const MobileMenu = dynamic(() => import('@/components/MobileMenu'), {
  ssr: false,
})

export default function ClientLayout({ children, initialTheme }) {
  const { isDark, toggleTheme } = useTheme(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHiddenPage = pathname === '/project' || pathname.startsWith('/dashboard')

  return (
    <MobileProvider>
      {!isHiddenPage && (
        <>
          <Header isDark={isDark} toggleTheme={toggleTheme} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} onMenuClose={() => setMenuOpen(false)} />
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isDark={isDark} toggleTheme={toggleTheme} />
        </>
      )}
      <LoadingBar />
      <RevealInit />
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </MobileProvider>
  )
}
