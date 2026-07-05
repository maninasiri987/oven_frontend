'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'
import SlotBox from './SlotBox'

export default function Hero() {
  const isMobile = useIsMobile()
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    if (isMobile) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const bgY = isMobile ? 0 : Math.min(scrollY * -0.0625, -25)
  const titleY = isMobile ? 0 : Math.min(scrollY * -0.025, -10)

  return (
    <section className="md:h-screen min-h-screen w-full flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden md:snap-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div
          style={{
            transform: `translateY(${bgY}px)`,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <SlotBox />
        </div>
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease 0.15s',
          }}
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-right"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s',
            }}
          >
            سایت فقط ویترین نیست؛ اهرم کسب‌وکارته
          </h1>
          <p
            className="text-dusty-grape dark:text-almond-silk text-base sm:text-lg mb-8 leading-relaxed text-right max-w-md"
            dir="rtl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s',
            }}
          >
            وب‌سایت‌هایی می‌سازیم که فقط آنلاین نیستند؛ بلکه رشد می‌دهند.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease 0.45s, transform 0.5s ease 0.45s',
            }}
          >
            <Link href="/project" className="w-full sm:w-auto text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20">شروع پروژه</Link>
            <Link href="/services" className="w-full sm:w-auto text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-200 hover:shadow-md hover:shadow-dusty-grape/10">مشاهده خدمات</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
