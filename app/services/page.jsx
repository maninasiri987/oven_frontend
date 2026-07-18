'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64" />,
})

const services = [
  {
    title: 'Fast Web',
    slug: 'fast-web',
    desc: 'سایت وردپرسی سریع و حرفه‌ای برای شروع سریع کسب‌وکار.',
    features: ['طراحی ریسپانسیو', 'سرعت بالا', 'SEO پایه', 'پنل مدیریت وردپرس'],
    suited: 'مناسب کسب‌وکارهای نوپا',
    delivery: '۷ تا ۱۰ روز',
    price: 'شروع از ۶٬۹۰۰٬۰۰۰ تومان',
  },
  {
    title: 'Pro Web',
    slug: 'pro-web',
    desc: 'وب‌سایت اختصاصی با امکانات سفارشی و طراحی منحصربفرد.',
    features: ['طراحی اختصاصی', 'امکانات سفارشی', 'پنل مدیریت', 'سئو حرفه‌ای'],
    suited: 'مناسب کسب‌وکارهای رشدیافته',
    delivery: '۱ تا ۲ ماه',
    price: 'شروع از ۲۴٬۹۰۰٬۰۰۰ تومان',
  },
  {
    title: 'سئو',
    slug: 'seo',
    desc: 'بهینه‌سازی سایت برای موتورهای جستجو و افزایش ترافیک.',
    features: ['آنالیز سئو', 'بهینه‌سازی محتوا', 'لینک‌سازی', 'گزارش ماهانه'],
    suited: 'مناسب همه سایت‌ها',
    delivery: '۱ تا ۳ ماه',
    price: 'شروع از ۲٬۴۹۰٬۰۰۰ تومان',
  },
  {
    title: 'طراحی قالب اختصاصی',
    slug: 'custom-theme',
    desc: 'طراحی و کدنویسی قالب وردپرسی متناسب با برند شما.',
    features: ['طراحی UI/UX', 'کدنویسی تمیز', 'ریسپانسیو', 'سازگار با افزونه‌ها'],
    suited: 'مناسب برندهای خاص',
    delivery: '۲ تا ۴ هفته',
    price: 'بر اساس پروژه',
  },
  {
    title: 'نجات سایت',
    slug: 'rescue',
    desc: 'اصلاح و بازسازی سایت‌های آسیب‌دیده یا کند.',
    features: ['آنالیز مشکلات', 'اصلاح کدها', 'بهینه‌سازی سرعت', 'بازیابی امنیتی'],
    suited: 'مناسب سایت‌های مشکل‌دار',
    delivery: '۳ تا ۱۰ روز',
    price: 'بر اساس بررسی',
  },
  {
    title: 'پشتیبانی',
    slug: 'support',
    desc: 'نگهداری، بروزرسانی و پشتیبانی فنی مداوم سایت شما.',
    features: ['بروزرسانی افزونه‌ها', 'پشتیبانی فنی', 'رفع مشکلات', 'گزارش ماهانه'],
    suited: 'مناسب همه سایت‌ها',
    delivery: 'ماهانه',
    price: 'شروع از ۷۹۰٬۰۰۰ تومان/ماه',
  },
]

export default function ServicesPage() {
  const pathname = usePathname()
  const [highlighted, setHighlighted] = useState(null)

  useEffect(() => {
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => setHighlighted(id), 0)
        const timer = setTimeout(() => setHighlighted(null), 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [pathname])

  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto" dir="rtl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">خدمات Oven</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-16 reveal" data-delay="50">هر چیزی که برای رشد آنلاینت نیاز داری</p>
          <div className="space-y-8">
            {services.map((s, i) => {
              return (
              <div key={s.title} id={s.title} className={`bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border rounded-2xl overflow-hidden reveal transition-all duration-700 ${highlighted === s.title ? 'border-space-indigo dark:border-parchment ring-2 ring-space-indigo/30 dark:ring-parchment/30 scale-[1.02] shadow-lg' : 'border-dusty-grape/20 dark:border-dusty-grape/30'}`} data-delay={i * 60}>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6 md:p-8 text-right">
                    <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-dusty-grape dark:text-almond-silk/80 mb-4 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                          <span className="w-1.5 h-1.5 rounded-full bg-dusty-grape dark:bg-almond-silk shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-72 p-6 md:p-8 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-r border-dusty-grape/10 dark:border-almond-silk/10 bg-white/20 dark:bg-space-indigo/60">
                    <div className="text-center">
                      {s.delivery && <div className="text-sm text-dusty-grape dark:text-almond-silk mb-1">{s.delivery}</div>}
                      <div className="text-xl font-semibold whitespace-nowrap">{s.price}</div>
                    </div>
                    <Link href={`/services/${s.slug}`} className="shrink-0 text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-300 whitespace-nowrap">بیشتر <span aria-hidden="true">←</span></Link>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
