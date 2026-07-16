'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MotionSection } from './Motion'

const items = [
  { title: 'پوشاک آرا', desc: 'فروشگاه آنلاین پوشاک با طراحی مدرن.', image: '/portfolio/cloth-store.png', link: 'https://maninasiri987.github.io/cloth_website/' },
  { title: 'بلاگی', desc: 'سیستم بلاگ حرفه‌ای با جستجوی هوشمند.', image: '/portfolio/blog-system.png', link: 'https://maninasiri987.github.io/blog_system/' },
  { title: 'GrowthBox', desc: 'اپلیکیشن مدیریت کارها و یادداشت‌ها.', image: '/portfolio/growthbox.png', link: 'https://groowth-box.vercel.app/dashboard' },
]

export default function Portfolio() {
  const [revealed, setRevealed] = useState(-1)
  const sectionRef = useRef(null)
  const triggered = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let intervalId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          let i = 0
          intervalId = setInterval(() => {
            setRevealed(i)
            i++
            if (i >= items.length) clearInterval(intervalId)
          }, 350)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 sm:px-10 md:h-screen min-h-screen w-full flex flex-col justify-center md:snap-center" dir="rtl">
      <div className="max-w-6xl mx-auto w-full">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">نمونه کار</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12">پروژه‌های واقعی Oven</p>
        </MotionSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="transition-all duration-300 ease-out"
              style={{
                opacity: i <= revealed ? 1 : 0,
                transform: i <= revealed ? 'translateY(0)' : 'translateY(40px)',
              }}
            >
              <Link
                href={item.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group block bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl overflow-hidden shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-dusty-grape/20 to-almond-silk/20 dark:from-dusty-grape/30 dark:to-space-indigo overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 text-right">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <span className="text-xs bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk px-2 py-0.5 rounded-full">
                      {item.title === 'GrowthBox' ? 'Pro Web' : 'Fast Web'}
                    </span>
                  </div>
                  <p className="text-sm text-dusty-grape dark:text-almond-silk/80">{item.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
