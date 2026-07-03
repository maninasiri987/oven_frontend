'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'
import SlotBox from './SlotBox'

export default function Hero() {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()

  const titleY = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : -10])
  const bgY = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : -25])

  return (
    <section className="md:h-screen min-h-screen w-full flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden md:snap-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        <motion.div style={{ y: bgY }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
          <SlotBox />
        </motion.div>
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-right"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
          >
            سایت فقط ویترین نیست؛ اهرم کسب‌وکارته
          </motion.h1>
          <motion.p
            className="text-dusty-grape dark:text-almond-silk text-base sm:text-lg mb-8 leading-relaxed text-right opacity-50"
            dir="rtl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
          >
            ما وب‌سایت‌هایی طراحی می‌کنیم که فراتر از حضور آنلاین عمل کنند<br />و به رشد کسب‌وکار کمک کنند.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
          >
            <Link href="/project" className="w-full sm:w-auto text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20">شروع پروژه</Link>
            <Link href="/services" className="w-full sm:w-auto text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-200 hover:shadow-md hover:shadow-dusty-grape/10">مشاهده خدمات</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
