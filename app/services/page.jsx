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
    desc: 'سایت وردپرسی سریع و حرفه‌ای برای شروع سریع کسب‌وکار.',
    features: ['طراحی ریسپانسیو', 'سرعت بالا', 'SEO پایه', 'پنل مدیریت وردپرس'],
    suited: 'مناسب کسب‌وکارهای نوپا',
    delivery: '۷ تا ۱۰ روز',
    price: 'شروع از ۶٬۹۰۰٬۰۰۰ تومان',
  },
  {
    title: 'Pro Web',
    desc: 'وب‌سایت اختصاصی با امکانات سفارشی و طراحی منحصربفرد.',
    features: ['طراحی اختصاصی', 'امکانات سفارشی', 'پنل مدیریت', 'سئو حرفه‌ای'],
    suited: 'مناسب کسب‌وکارهای رشدیافته',
    delivery: '۱ تا ۲ ماه',
    price: 'شروع از ۲۴٬۹۰۰٬۰۰۰ تومان',
  },
  {
    title: 'سئو',
    desc: 'بهینه‌سازی سایت برای موتورهای جستجو و افزایش ترافیک.',
    features: ['آنالیز سئو', 'بهینه‌سازی محتوا', 'لینک‌سازی', 'گزارش ماهانه'],
    suited: 'مناسب همه سایت‌ها',
    delivery: '۱ تا ۳ ماه',
    price: 'شروع از ۲٬۴۹۰٬۰۰۰ تومان',
  },
  {
    title: 'طراحی قالب اختصاصی',
    desc: 'طراحی و کدنویسی قالب وردپرسی متناسب با برند شما.',
    features: ['طراحی UI/UX', 'کدنویسی تمیز', 'ریسپانسیو', 'سازگار با افزونه‌ها'],
    suited: 'مناسب برندهای خاص',
    delivery: '۲ تا ۴ هفته',
    price: 'بر اساس پروژه',
  },
  {
    title: 'نجات سایت',
    desc: 'اصلاح و بازسازی سایت‌های آسیب‌دیده یا کند.',
    features: ['آنالیز مشکلات', 'اصلاح کدها', 'بهینه‌سازی سرعت', 'بازیابی امنیتی'],
    suited: 'مناسب سایت‌های مشکل‌دار',
    delivery: '۳ تا ۱۰ روز',
    price: 'بر اساس بررسی',
  },
  {
    title: 'پشتیبانی',
    desc: 'نگهداری، بروزرسانی و پشتیبانی فنی مداوم سایت شما.',
    features: ['بروزرسانی افزونه‌ها', 'پشتیبانی فنی', 'رفع مشکلات', 'گزارش ماهانه'],
    suited: 'مناسب همه سایت‌ها',
    delivery: 'ماهانه',
    price: 'شروع از ۷۹۰٬۰۰۰ تومان/ماه',
  },
]

const serviceFeatureKeys = {
  'سئو': ['seo'],
  'طراحی قالب اختصاصی': ['sections', 'pages'],
  'نجات سایت': ['support'],
  'پشتیبانی': ['support'],
}

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
              const isPackage = s.title === 'Fast Web' || s.title === 'Pro Web'
              const serviceParam = s.title === 'Fast Web' ? 'fast' : s.title === 'Pro Web' ? 'pro' : 'web'
              const features = serviceFeatureKeys[s.title] || []
              const params = new URLSearchParams({ service: serviceParam })
              if (!isPackage) {
                params.set('step', '2')
                if (features.length) params.set('features', features.join(','))
              }
              return (
              <div key={s.title} id={s.title} className={`bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border rounded-2xl p-8 reveal transition-all duration-700 ${highlighted === s.title ? 'border-space-indigo dark:border-parchment ring-2 ring-space-indigo/30 dark:ring-parchment/30 scale-[1.02] shadow-lg' : 'border-dusty-grape/20 dark:border-dusty-grape/30'}`} data-delay={i * 60}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="text-right flex-1">
                    <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-dusty-grape dark:text-almond-silk/80 mb-3">{s.desc}</p>
                    {s.suited && <p className="text-xs text-dusty-grape dark:text-almond-silk mb-4">{s.suited}</p>}
                    <ul className="space-y-2">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                          <span className="w-1.5 h-1.5 rounded-full bg-dusty-grape dark:bg-almond-silk shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-left md:text-right md:min-w-[200px] space-y-2">
                    {s.delivery && <div className="text-sm text-dusty-grape dark:text-almond-silk">{s.delivery}</div>}
                    <div className="text-lg font-semibold">{s.price}</div>
                    <Link href={`/project?${params}`} className="block w-full text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-300">ثبت پروژه</Link>
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
