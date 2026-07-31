'use client'
import { useState } from 'react'
import { Sun, Moon, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import servicesData from '@/data/services'

const links = [
  { label: 'نمونه کار', href: '/portfolio' },
  { label: 'پلن ها', href: '/plans' },
  { label: 'درباره ما', href: '/about' },
]

const serviceLinks = [
  { label: 'طراحی سایت فروشگاهی', href: '/plans/froshgahi' },
  { label: 'طراحی سایت شرکتی', href: '/plans/sherkati' },
  ...servicesData.map(s => ({ label: s.title, href: `/services/${s.slug}` })),
]

export default function MobileMenu({ isOpen, onClose, isDark, toggleTheme }) {
  const pathname = usePathname()
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesActive = pathname === '/services' || pathname.startsWith('/services/')

  // Reset the expanded services submenu whenever the menu closes.
  const handleClose = () => {
    setServicesOpen(false)
    onClose()
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[80] bg-black/40 md:hidden transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      <div
        className={`fixed top-0 right-0 z-[80] w-full sm:w-72 h-full bg-white dark:bg-space-indigo flex flex-col py-12 px-6 md:hidden transition-all duration-300 ease-in-out will-change-transform ${isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}
        style={{ boxShadow: isOpen ? '0 0 40px rgba(0,0,0,0.15)' : 'none' }}
      >
        <Link href="/" onClick={handleClose} className="mb-8 self-center">
          <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={80} height={80} className="h-20" />
        </Link>
        <nav className="flex flex-col w-full">
          {/* خدمات — expandable submenu */}
          <div>
            <button
              type="button"
              onClick={() => setServicesOpen(prev => !prev)}
              aria-expanded={servicesOpen}
              className={`w-full flex items-center justify-between py-4 text-sm font-medium transition-colors cursor-pointer ${servicesActive ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk'}`}
            >
              <span className="relative pb-1">خدمات</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ps-5 pb-3 space-y-1">
                {serviceLinks.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={handleClose}
                    className={`block py-2 text-sm transition-colors ${pathname === s.href ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk'}`}
                  >
                    {s.label}
                  </Link>
                ))}
                <Link href="/services" onClick={handleClose} className="block py-2 text-sm font-semibold text-space-indigo dark:text-parchment">
                  همه خدمات
                </Link>
              </div>
            </div>
          </div>

          {/* Other links */}
          {links.map((link, i) => {
            const isActive = link.href === '/plans' ? pathname.startsWith('/plans') : pathname === link.href
            const isLast = i === links.length - 1
            return (
              <Link key={link.href} href={link.href} onClick={handleClose} className={`relative py-4 text-sm font-medium transition-colors group border-t border-dusty-grape/10 dark:border-almond-silk/10 ${isLast ? 'border-b' : ''} ${isActive ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment'}`}>
                <span className="relative pb-1">{link.label}</span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-space-indigo dark:bg-parchment transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto flex items-center justify-center">
          <button onClick={toggleTheme} aria-label="تغییر تم" className="w-12 h-12 flex items-center justify-center rounded-lg bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk cursor-pointer hover:bg-dusty-grape/20 dark:hover:bg-almond-silk/20 transition-all group">
            {isDark ? <Sun key="dark" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> : <Moon key="light" className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />}
          </button>
        </div>
      </div>
    </>
  )
}
