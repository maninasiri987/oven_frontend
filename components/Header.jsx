'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Sun, Moon, Phone, ArrowLeft, ChevronDown } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import servicesData from '@/data/services'

const navItems = [
  { label: 'خدمات', href: '/services' },
  { label: 'نمونه کار', href: '/portfolio' },
  { label: 'پلن ها', href: '/plans' },
  { label: 'درباره ما', href: '/about' },
]

const serviceDropdown = [
  { title: 'طراحی سایت فروشگاهی', desc: 'فروشگاه اینترنتی کامل با پلن‌های متنوع', href: '/plans/froshgahi' },
  { title: 'طراحی سایت شرکتی', desc: 'سایت شرکتی مدرن و حرفه‌ای', href: '/plans/sherkati' },
  ...servicesData.map(s => ({ title: s.title, desc: s.shortDesc, href: `/services/${s.slug}` })),
]

export default function Header({ isDark, toggleTheme, menuOpen, onMenuOpen, onMenuClose }) {
  const [compact, setCompact] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [servicesPos, setServicesPos] = useState(null)
  const closeTimer = useRef(null)
  const servicesRef = useRef(null)
  const servicesOpenRef = useRef(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()

  const openServices = () => {
    clearTimeout(closeTimer.current)
    if (servicesRef.current) {
      const rect = servicesRef.current.getBoundingClientRect()
      setServicesPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    }
    setServicesOpen(true)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])
  useEffect(() => {
    servicesOpenRef.current = servicesOpen
  }, [servicesOpen])

  // Close the dropdown if the viewport shrinks below md (nav item disappears).
  useEffect(() => {
    const onResize = () => {
      if (servicesOpenRef.current && window.innerWidth < 768) {
        setServicesOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  const cancelClose = () => clearTimeout(closeTimer.current)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Defer the reset out of the effect body (async) to avoid synchronous
    // setState calls that trigger cascading renders.
    const raf = requestAnimationFrame(() => {
      setCompact(false)
      setScrollProgress(0)
      setServicesOpen(false)
    })
    return () => cancelAnimationFrame(raf)
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

      // Keep the services dropdown aligned under its nav item if the header
      // resizes (e.g. transitions to the compact pill on scroll).
      if (servicesOpenRef.current && servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect()
        setServicesPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
      }

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
    {pathname !== '/project' && (
    <button onClick={menuOpen ? onMenuClose : onMenuOpen} aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} className="fixed z-[90] md:hidden cursor-pointer w-9 h-9 flex items-center justify-center" style={{
      top: menuOpen ? '16px' : compact ? '14px' : '20px',
      right: menuOpen ? '16px' : compact ? 'calc(12.5vw + 16px)' : '16px',
      transition: 'top 0.3s ease, right 0.3s ease',
    }}>
      <div className="relative w-5 h-5">
        <span className="absolute left-0 top-0.5 h-0.5 w-5 bg-dusty-grape dark:text-almond-silk bg-current rounded-full" style={{
          transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          transition: 'transform 0.3s ease',
        }}></span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 bg-dusty-grape dark:text-almond-silk bg-current rounded-full" style={{
          opacity: menuOpen ? 0 : 1,
          transition: 'opacity 0.15s ease',
        }}></span>
        <span className="absolute left-0 bottom-0.5 h-0.5 w-5 bg-dusty-grape dark:text-almond-silk bg-current rounded-full" style={{
          transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          transition: 'transform 0.3s ease',
        }}></span>
      </div>
    </button>
    )}

    <header
      className="fixed z-30 left-1/2 top-2 h-16 flex items-center justify-between px-3 sm:px-6 transition-all duration-300 ease-in-out overflow-hidden"
      style={{
        // On the project wizard page the pill bar stays hidden (focus mode),
        // but the mobile hamburger (rendered separately below) stays available.
        transform: pathname === '/project' ? 'translate(-50%, -120%)' : 'translate(-50%, 0)',
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
        {/* Back button — shows on the services page, plans sub-pages and service detail pages */}
        {(pathname === '/services' || pathname.startsWith('/plans/') || pathname.startsWith('/services/')) && (
          <button
            onClick={() => router.back()}
            aria-label="بازگشت"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-almond-silk/30 dark:hover:bg-dusty-grape/30 transition-all duration-200 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-dusty-grape dark:text-almond-silk group-hover:-translate-x-0.5 transition-transform duration-200" />
          </button>
        )}
        <a href="tel:09105362403" className="hidden md:flex items-center justify-center gap-2 text-sm font-medium text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment transition-colors duration-150 whitespace-nowrap">
          <Phone className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <span className="pt-1" dir="ltr">09105362403</span>
        </a>
        <Link href="/" className="cursor-pointer sm:hidden">
          <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={56} height={56} className="h-14" priority />
        </Link>
      </div>
      <Link href="/" className="cursor-pointer absolute left-1/2 -translate-x-1/2 hidden sm:block md:hidden">
        <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={80} height={80} className="h-20" priority />
      </Link>
      <div className="flex items-center gap-2 md:gap-6">
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => {
            const isActive = item.href === '/plans'
              ? pathname.startsWith('/plans')
              : item.href === '/services'
                ? pathname === '/services' || pathname.startsWith('/services/')
                : pathname === item.href

            if (item.label === 'خدمات') {
              return (
                <div key={item.label} ref={servicesRef} className="relative" onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                  <Link href={item.href} className={`relative pb-1 flex items-center gap-1 text-sm font-medium transition-colors duration-150 group ${isActive ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment'}`}>
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-space-indigo dark:bg-parchment transition-all duration-300 ${isActive || servicesOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </div>
              )
            }
            return (
              <Link key={item.label} href={item.href} className={`relative pb-1 text-sm font-medium transition-colors duration-150 group ${isActive ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment'}`}>
                {item.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-space-indigo dark:bg-parchment transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </nav>
        <button onClick={toggleTheme} aria-label="تغییر تم" className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-almond-silk/30 dark:hover:bg-dusty-grape/30 transition-all duration-150 cursor-pointer group">
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

    {/* خدمات dropdown — desktop hover */}
    {servicesOpen && servicesPos && (
      <div
        dir="rtl"
        className="fixed z-40 w-72 rounded-2xl bg-white/90 dark:bg-space-indigo/90 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 shadow-xl shadow-dusty-grape/20 dark:shadow-black/30 overflow-hidden"
        style={{ top: servicesPos.top, right: servicesPos.right }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="py-2">
          {serviceDropdown.map(s => (
            <Link key={s.href} href={s.href} className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-dusty-grape/5 dark:hover:bg-almond-silk/5 transition-colors">
              <span className="text-sm font-medium text-space-indigo dark:text-parchment">{s.title}</span>
              <span className="text-xs text-dusty-grape/80 dark:text-almond-silk/70 leading-relaxed">{s.desc}</span>
            </Link>
          ))}
        </div>
        <Link href="/services" className="block text-center text-sm font-medium py-2.5 border-t border-dusty-grape/10 dark:border-almond-silk/10 text-space-indigo dark:text-parchment hover:bg-dusty-grape/5 dark:hover:bg-almond-silk/5 transition-colors">
          همه خدمات
        </Link>
      </div>
    )}

    {/* Fixed call button — mobile only */}
    <a
      href="tel:09105362403"
      aria-label="تماس با ما"
      className="fixed z-50 md:hidden bottom-6 left-6 w-14 h-14 rounded-full bg-space-indigo dark:bg-parchment flex items-center justify-center shadow-lg shadow-dusty-grape/30 dark:shadow-space-indigo/40 transition-all duration-300 active:scale-95"
    >
      <Phone className="w-5 h-5 text-parchment dark:text-space-indigo" />
    </a>
    </>
  )
}
