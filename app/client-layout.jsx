'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import useTheme from '@/hooks/useTheme'
import { MobileProvider } from '@/contexts/MobileContext'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedPages({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}

export default function ClientLayout({ children, initialTheme }) {
  const { isDark, toggleTheme } = useTheme(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MobileProvider>
      <Header isDark={isDark} toggleTheme={toggleTheme} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} onMenuClose={() => setMenuOpen(false)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isDark={isDark} toggleTheme={toggleTheme} />
      <AnimatedPages>
        {children}
      </AnimatedPages>
    </MobileProvider>
  )
}
