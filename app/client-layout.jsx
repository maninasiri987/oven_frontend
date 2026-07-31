'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import useTheme from '@/hooks/useTheme'
import { MobileProvider } from '@/contexts/MobileContext'
import RevealInit from '@/components/RevealInit'
import { markFirstLoadDone } from '@/lib/first-load'

// iOS Safari sometimes fails to repaint fixed elements (e.g. the call button)
// when returning from another app or the back/forward cache. Toggling the
// scroll class forces a reflow so those elements render again.
function useRepaintOnReturn() {
  useEffect(() => {
    // snap=true only for genuine back/forward-cache restores (pageshow with
    // event.persisted), where elements may come back mid-transition and stay
    // stuck blank on iOS Safari. Normal loads/tab-switches only repaint.
    const forceRepaint = (snap = false) => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('repaint-force')
        if (snap) document.documentElement.classList.add('repaint-snap')
        void document.documentElement.offsetHeight
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('repaint-force')
          document.documentElement.classList.remove('repaint-snap')
        })
      })
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') forceRepaint()
    }
    const onPageShow = (e) => forceRepaint(e.persisted === true)
    const onFocus = () => forceRepaint()
    window.addEventListener('pageshow', onPageShow)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('pageshow', onPageShow)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('focus', onFocus)
    }
  }, [])
}

const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <header className="fixed z-30 left-1/2 -translate-x-1/2 top-2 h-16 w-full" />,
})

const MobileMenu = dynamic(() => import('@/components/MobileMenu'), {
  ssr: false,
})

export default function ClientLayout({ children, initialTheme }) {
  const { isDark, toggleTheme } = useTheme(initialTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageReady, setPageReady] = useState(false)
  const pathname = usePathname()
  const isHiddenPage = pathname.startsWith('/dashboard')

  useRepaintOnReturn()

  // First mount of the persistent shell = the first open of the website,
  // on whatever page the user lands. From then on, the home-page loading
  // spinners stay hidden during client-side navigations.
  useEffect(() => {
    markFirstLoadDone()
  }, [])

  // Keep the loading screen visible until the page is fully ready (window
  // 'load' fires once all images/fonts/styles are in), with a short minimum
  // display time so it never blinks. All state updates happen asynchronously
  // (events/timers), never synchronously inside the effect.
  useEffect(() => {
    let cancelled = false
    const startedAt = Date.now()
    const hide = () => {
      if (cancelled) return
      const remaining = 600 - (Date.now() - startedAt)
      if (remaining > 0) {
        setTimeout(() => { if (!cancelled) setPageReady(true) }, remaining)
      } else {
        setPageReady(true)
      }
    }
    if (document.readyState === 'complete') {
      const raf = requestAnimationFrame(hide)
      return () => { cancelled = true; cancelAnimationFrame(raf) }
    }
    window.addEventListener('load', hide)
    const safety = setTimeout(hide, 5000)
    return () => {
      cancelled = true
      window.removeEventListener('load', hide)
      clearTimeout(safety)
    }
  }, [])

  return (
    <MobileProvider>
      {!isHiddenPage && (
        <>
          <Header isDark={isDark} toggleTheme={toggleTheme} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} onMenuClose={() => setMenuOpen(false)} />
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isDark={isDark} toggleTheme={toggleTheme} />
        </>
      )}
      <RevealInit />
      <div key={pathname} className="page-transition">
        {children}
      </div>
      {/* Loading screen: shown on every fresh page load until the page is
          fully ready, then faded out. The shell never remounts on client-side
          navigation, so it can't reappear when moving between pages. */}
      <div className={`first-load-overlay ${pageReady ? 'first-load-done' : ''}`} aria-hidden="true">
        <div className="w-12 h-12 border-4 border-l-space-indigo dark:border-l-parchment border-r-space-indigo dark:border-r-parchment border-t-transparent border-b-transparent rounded-full animate-spin" />
      </div>
    </MobileProvider>
  )
}
