'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import useTheme from '@/hooks/useTheme'
import { MobileProvider } from '@/contexts/MobileContext'

const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <header className="fixed z-30 left-1/2 -translate-x-1/2 top-2 h-16 w-full" />,
})

const MobileMenu = dynamic(() => import('@/components/MobileMenu'), {
  ssr: false,
})

export default function ClientLayout({ children, initialTheme }) {
  const { isDark, toggleTheme } = useTheme(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MobileProvider>
      <Header isDark={isDark} toggleTheme={toggleTheme} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} onMenuClose={() => setMenuOpen(false)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isDark={isDark} toggleTheme={toggleTheme} />
      <div className="page-transition">
        {children}
      </div>
    </MobileProvider>
  )
}
