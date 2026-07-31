'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import QuickSelection from '@/components/QuickSelection'
import { firstLoadDone } from '@/lib/first-load'

// Show the animated spinner only on the very first load of the site (fresh
// page load). On client-side navigations the dynamic chunks are already in
// cache, so we render an empty placeholder instead of a loading animation.
// The flag lives in lib/first-load.js and is flipped by the persistent shell
// (client-layout) on first mount of any route.
function LoadingFallback({ className }) {
  return (
    <div className={className}>
      {firstLoadDone ? null : <div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" />}
    </div>
  )
}

const ProcessTimeline = dynamic(() => import('@/components/ProcessTimeline'), {
  loading: () => <LoadingFallback className="md:h-screen flex items-center justify-center" />,
})

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <LoadingFallback className="md:h-screen w-full flex items-center justify-center" />,
})

const Estimate = dynamic(() => import('@/components/Estimate'), {
  loading: () => <LoadingFallback className="md:h-screen w-full flex items-center justify-center" />,
})

const WhyOven = dynamic(() => import('@/components/WhyOven'), {
  loading: () => <LoadingFallback className="md:h-screen w-full flex items-center justify-center" />,
})

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => <LoadingFallback className="md:h-screen w-full flex items-center justify-center" />,
})

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <LoadingFallback className="md:h-screen w-full flex items-center justify-center" />,
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <LoadingFallback className="h-64 flex items-center justify-center" />,
})

export default function Home() {
  useEffect(() => {
    function getContainer() {
      return document.querySelector('[data-scroll-container]')
    }
    function onKey(e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      // never hijack arrows while the user is typing in a form field or editable area
      if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable="true"]')) return
      const c = getContainer()
      if (!c) return
      e.preventDefault()
      const sectionH = c.clientHeight
      const dir = e.key === 'ArrowDown' ? 1 : -1
      const next = Math.round(c.scrollTop / sectionH + dir) * sectionH
      c.scrollTo({ top: Math.max(0, Math.min(next, c.scrollHeight - c.clientHeight)), behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div data-scroll-container className="md:snap-y md:snap-mandatory md:overflow-y-auto md:h-screen">
      <p className="sr-only">طراحی سایت حرفه‌ای برای رشد واقعی کسب‌وکار</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'چقدر زمان می‌برد؟', acceptedAnswer: { '@type': 'Answer', text: 'بسته به پلن انتخابی: پلن‌های اقتصادی بین ۷ تا ۱۰ روز، پلن‌های حرفه‌ای ۲ تا ۴ هفته و پلن‌های اختصاصی ۲ تا ۳ ماه زمان می‌برند.' } },
              { '@type': 'Question', name: 'هزینه‌ها چطور محاسبه می‌شود؟', acceptedAnswer: { '@type': 'Answer', text: 'هزینه بر اساس پلن پایه و امکانات اضافی محاسبه می‌شود. با استفاده از ابزار برآورد اولیه می‌توانید هزینه تقریبی را ببینید.' } },
              { '@type': 'Question', name: 'بعد از تحویل چه می‌شود؟', acceptedAnswer: { '@type': 'Answer', text: 'مالکیت کامل سایت و فایل‌ها به شما منتقل می‌شود. امکان اضافه کردن پشتیبانی ماهانه هم وجود دارد.' } },
              { '@type': 'Question', name: 'پشتیبانی دارید؟', acceptedAnswer: { '@type': 'Answer', text: 'بله، پشتیبانی ماهانه با هزینه جداگانه قابل اضافه شدن است. شامل بروزرسانی، پشتیبانی فنی و رفع مشکلات می‌شود.' } },
            ],
          }),
        }}
      />
      <Hero />
      <QuickSelection />
      <ProcessTimeline />
      <Services />
      <Estimate />
      <WhyOven />
      <Portfolio />
      <FAQ />
      <Footer />
    </div>
  )
}
