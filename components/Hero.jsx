'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
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
    <section className="md:h-screen min-h-screen w-full flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden md:snap-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div ref={bgRef} className="flex items-center justify-center">
          {/* Desktop: large eclipse */}
          <div className="hidden md:block relative w-full max-w-md lg:max-w-lg aspect-square">
            <BlackHole />
          </div>
          {/* Mobile: compact eclipse */}
          <div className="md:hidden relative mx-auto w-[280px] sm:w-[300px] aspect-square">
            <BlackHole />
          </div>
        </div>
        <div ref={titleRef} className="-mt-8 md:mt-0">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-right leading-[1.4]"
          >
            سایت فقط ویترین نیست؛ اهرم کسب‌وکارته
          </h1>
          <p
            className="text-dusty-grape/60 dark:text-almond-silk/60 text-base sm:text-lg mb-8 leading-relaxed text-right -mt-4"
            dir="rtl"
          >
            oven مجموعه‌ای تخصصی در زمینه طراحی سایت، سئو و توسعه وب است. ما وب‌سایت‌هایی سریع، مدرن و بهینه می‌سازیم که علاوه بر ظاهر حرفه‌ای، برای رشد واقعی کسب‌وکار شما طراحی شده‌اند.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/project" className="w-full sm:w-auto text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20">شروع پروژه</Link>
            <Link href="/services" className="w-full sm:w-auto text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-200 hover:shadow-md hover:shadow-dusty-grape/10">مشاهده خدمات</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
