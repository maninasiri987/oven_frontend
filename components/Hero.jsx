'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import BlackHole from './BlackHole'

export default function Hero() {
  const isMobile = useIsMobile()
  const bgRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (isMobile) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY
          if (bgRef.current) bgRef.current.style.transform = `translateY(${Math.min(sy * -0.0625, -25)}px)`
          if (titleRef.current) titleRef.current.style.transform = `translateY(${Math.min(sy * -0.025, -10)}px)`
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  return (
    <section className="relative md:h-screen min-h-screen w-full flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden md:snap-center py-16 md:py-0">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div ref={bgRef} className="flex items-center justify-center">
          {/* Desktop: large eclipse */}
          <div className="hidden md:block relative w-full max-w-md lg:max-w-lg aspect-square">
            <BlackHole />
          </div>
          {/* Mobile: compact eclipse (kept small so CTAs fit on short screens) */}
          <div className="md:hidden relative mx-auto w-[240px] min-[400px]:w-[280px] aspect-square">
            <BlackHole />
          </div>
        </div>
        <div ref={titleRef} className="-mt-4 md:mt-0">
          <h1
            className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-5 text-right leading-[1.4]"
          >
            سایت فقط ویترین نیست؛ اهرم کسب‌وکارته
          </h1>
          <p
            className="text-dusty-grape/80 dark:text-almond-silk/70 text-base sm:text-lg mb-6 leading-relaxed text-right -mt-3"
            dir="rtl"
          >
            oven مجموعه‌ای تخصصی در زمینه طراحی سایت، سئو و توسعه وب است. ما وب‌سایت‌هایی سریع، مدرن و بهینه می‌سازیم که علاوه بر ظاهر حرفه‌ای، برای رشد واقعی کسب‌وکار شما طراحی شده‌اند.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Link href="/project" className="w-full sm:w-auto text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20">شروع پروژه</Link>
            <Link href="/services" className="w-full sm:w-auto text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-200 hover:shadow-md hover:shadow-dusty-grape/10">مشاهده خدمات</Link>
          </div>
        </div>
      </div>
      {/* Scroll cue — desktop only, snap-scrolled sections have no visible scrollbar */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-dusty-grape dark:text-almond-silk opacity-70">
        <span className="text-[11px] tracking-wide">اسکرول</span>
        <ChevronDown className="w-4 h-4 motion-safe:animate-bounce" />
      </div>
    </section>
  )
}
