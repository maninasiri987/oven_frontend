'use client'
import { Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'خدمات', href: '/services' },
  { label: 'نمونه کار', href: '/portfolio' },
  { label: 'پلن ها', href: '/plans' },
  { label: 'درباره ما', href: '/about' },
]

export default function MobileMenu({ isOpen, onClose, isDark, toggleTheme }) {
  const pathname = usePathname()

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 md:hidden transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-50 w-full sm:w-72 h-full bg-white dark:bg-space-indigo flex flex-col py-12 px-6 md:hidden transition-all duration-300 ease-in-out will-change-transform ${isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}
        style={{ boxShadow: isOpen ? '0 0 40px rgba(0,0,0,0.15)' : 'none' }}
      >
        <Link href="/" onClick={onClose} className="mb-8 self-center">
          <Image src="/assets/logo.webp" alt="Oven - طراحی سایت" width={80} height={80} className="h-20" />
        </Link>
        <nav className="flex flex-col w-full">
          {links.map((link, i) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href} onClick={onClose} className={`relative py-4 text-sm font-medium transition-colors group ${isActive ? 'text-space-indigo dark:text-parchment' : 'text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment'} ${i > 0 ? 'border-t border-dusty-grape/10 dark:border-almond-silk/10' : ''} ${i === links.length - 1 ? 'border-b' : ''} border-dusty-grape/10 dark:border-almond-silk/10`}>
                <span className="relative pb-1">{link.label}</span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-space-indigo dark:bg-parchment transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto flex items-center justify-center">
          <button onClick={toggleTheme} className="w-12 h-12 flex items-center justify-center rounded-lg bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk cursor-pointer hover:bg-dusty-grape/20 dark:hover:bg-almond-silk/20 transition-all group">
            {isDark ? <Sun key="dark" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> : <Moon key="light" className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />}
          </button>
        </div>
      </div>
    </>
  )
}
