'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Sun, Moon, Phone } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

const navItems = [
  { label: 'خدمات', href: '/services' },
  { label: 'نمونه کار', href: '/portfolio' },
  { label: 'پلن ها', href: '/plans' },
  { label: 'درباره ما', href: '/about' },
]

export default function Header({ isDark, toggleTheme, menuOpen, onMenuOpen, onMenuClose }) {
  const [compact, setCompact] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo(0, 0)
    setCompact(false)
    setScrollProgress(0)
  }, [pathname])

  useEffect(() => {
    let raf
    let cachedContainer = null
    let isContainerScroll = false

    const detectContainer = () => {
      const c = document.querySelector('[data-scroll-container]')
      if (c && c.scrollHeight > c.clientHeight) {
        const style = getComputedStyle(c)
        cachedContainer = c
        isContainerScroll = style.overflowY === 'auto' || style.overflowY === 'scroll'
      } else {
        cachedContainer = null
        isContainerScroll = false
      }
    }

    detectContainer()
    window.addEventListener('resize', detectContainer)

    const tick = () => {
      if (cachedContainer && !cachedContainer.isConnected) detectContainer()

      const sy = Math.max(window.scrollY, isContainerScroll ? cachedContainer.scrollTop : 0)
      setCompact(sy > 50)

      if (isContainerScroll) {
        const dh = cachedContainer.scrollHeight - cachedContainer.clientHeight
        setScrollProgress(dh > 0 ? Math.min(cachedContainer.scrollTop / dh, 1) : 0)
      } else {
        const dh = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(dh > 0 ? Math.min(window.scrollY / dh, 1) : 0)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', detectContainer)
    }
  }, [pathname])

  return (
    <>
    {pathname !== '/project' && <button onClick={menuOpen ? onMenuClose : onMenuOpen} className="fixed z-[60] md:hidden cursor-pointer w-9 h-9 flex items-center justify-center" style={{
      top: menuOpen ? '16px' : compact ? '14px' : '20px',
      right: menuOpen ? '16px' : compact ? 'calc(12.5vw + 16px)' : '16px',
      transition: 'top 0.3s ease, right 0.3s ease',
    }}>
      <div className="relative w-5 h-5">
        <span className="absolute left-0 top-0.5 h-0.5 w-5 bg-dusty-grape dark:text-almond-silk bg-current rounded-full" style={{
          transform: menuOpen ? 'translateY(8px) scaleX(0)' : 'none',
          opacity: menuOpen ? 0 : 1,
          transition: 'transform 0.3s ease, opacity 0.15s ease',
        }}></span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 bg-dusty-grape dark:text-almond-silk bg-current rounded-full" style={{
          transform: menuOpen ? 'scaleX(0)' : 'none',
          opacity: menuOpen ? 0 : 1,
          transition: 'transform 0.3s ease, opacity 0.15s ease',
        }}></span>
        <span className="absolute left-0 bottom-0.5 h-0.5 w-5 bg-dusty-grape dark:text-almond-silk bg-current rounded-full" style={{
          transform: menuOpen ? 'translateY(-8px) scaleX(0)' : 'none',
          opacity: menuOpen ? 0 : 1,
          transition: 'transform 0.3s ease, opacity 0.15s ease',
        }}></span>
        <svg className="absolute inset-0 w-5 h-5 text-dusty-grape dark:text-almond-silk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.15s ease 0.15s',
        }}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </button>}

    <header
      className="fixed z-30 left-1/2 top-2 h-16 flex items-center justify-between px-3 sm:px-6 transition-all duration-300 ease-in-out overflow-hidden"
      style={{
        transform: pathname === '/project' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
        width: compact ? '75%' : '100%',
        borderRadius: compact ? '9999px' : '0',
        backgroundColor: compact ? (isMobile ? (isDark ? '#0a0908' : '#eae0d5') : (isDark ? 'rgba(10,9,8,0.6)' : 'rgba(234,224,213,0.6)')) : 'transparent',
        backdropFilter: compact && !isMobile ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: compact && !isMobile ? 'blur(20px)' : 'none',
        border: compact ? '1px solid rgba(94,80,63,0.25)' : '1px solid transparent',
        padding: compact ? '4px 16px' : undefined,
        height: compact ? '48px' : undefined,
      }}
    >
      <div className="flex items-center gap-2 md:gap-6">
        <a href="tel:09105362403" className="group flex items-center justify-center gap-2 text-sm font-medium text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment transition-colors duration-150 whitespace-nowrap">
          <Phone className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <span className="pt-1 hidden sm:inline" dir="ltr">09105362403</span>
        </a>
      </div>
      <Link href="/" className="cursor-pointer absolute left-1/2 -translate-x-1/2 sm:hidden">
        <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={56} height={56} className="h-14" priority />
      </Link>
      <Link href="/" className="cursor-pointer absolute left-1/2 -translate-x-1/2 hidden sm:block md:hidden">
        <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={80} height={80} className="h-20" priority />
      </Link>
      <div className="flex items-center gap-2 md:gap-6">
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link key={item.label} href={item.href} className={`relative pb-1 text-sm font-medium transition-colors duration-150 group ${isActive ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment'}`}>
                {item.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-space-indigo dark:bg-parchment transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </nav>
        <button onClick={toggleTheme} className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-almond-silk/30 dark:hover:bg-dusty-grape/30 transition-all duration-150 cursor-pointer group">
          {isDark ? <Sun className="w-4 h-4 text-almond-silk group-hover:rotate-180 transition-transform duration-500" /> : <Moon className="w-4 h-4 text-dusty-grape group-hover:-rotate-12 transition-transform duration-300" />}
        </button>
        <div className="hidden md:block w-px h-8 bg-almond-silk dark:bg-dusty-grape"></div>
        <Link href="/" className="cursor-pointer hidden md:block">
        <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={80} height={80} className="h-20" priority />
        </Link>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
        style={{
          opacity: compact ? 1 : 0,
          transition: 'opacity 0.3s ease',
          left: compact ? '16px' : '0',
          right: compact ? '16px' : '0',
        }}
      >
        <div className="absolute inset-0 bg-white/10"></div>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #5e503f, #c6ac8f)',
            boxShadow: isDark ? '0 0 6px rgba(94,80,63,0.4)' : '0 0 6px rgba(94,80,63,0.2)',
            transition: 'width 0.15s linear',
          }}
        ></div>
      </div>
    </header>
    </>
  )
}
