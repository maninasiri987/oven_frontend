'use client'
import Link from 'next/link'
import { MotionSection, StaggerGroup, StaggerItem } from './Motion'

const services = [
  { title: 'Fast Web', desc: 'سایت وردپرسی سریع و حرفه‌ای برای شروع سریع کسب‌وکار.', suited: 'مناسب کسب‌وکارهای نوپا' },
  { title: 'Pro Web', desc: 'وب‌سایت اختصاصی با امکانات سفارشی و طراحی منحصربفرد.', suited: 'مناسب کسب‌وکارهای رشدیافته' },
  { title: 'سئو', desc: 'بهینه‌سازی سایت برای موتورهای جستجو و افزایش ترافیک.', suited: 'مناسب همه سایت‌ها' },
  { title: 'طراحی قالب اختصاصی', desc: 'طراحی و کدنویسی قالب وردپرسی متناسب با برند شما.', suited: 'مناسب برندهای خاص' },
  { title: 'نجات سایت', desc: 'اصلاح و بازسازی سایت‌های آسیب‌دیده یا کند.', suited: 'مناسب سایت‌های مشکل‌دار' },
  { title: 'پشتیبانی', desc: 'نگهداری، بروزرسانی و پشتیبانی فنی مداوم سایت شما.', suited: 'مناسب همه سایت‌ها' },
]

export default function Services() {
  return (
    <section className="py-20 px-6 sm:px-10 md:h-screen min-h-screen w-full flex flex-col justify-center md:snap-center bg-almond-silk/20 dark:bg-dusty-grape/10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 text-right">خدمات</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12">هر چیزی که برای رشد آنلاینت نیاز داری</p>
        </MotionSection>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 text-right shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300">
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-dusty-grape dark:text-almond-silk/80 mb-3">{s.desc}</p>
                <p className="text-xs text-dusty-grape dark:text-almond-silk mb-4">{s.suited}</p>
                <Link href={`/services#${s.title}`} className="group inline-flex items-center gap-1 text-sm text-dusty-grape dark:text-almond-silk">
                  <span className="relative">
                    بیشتر
                    <span className="absolute -bottom-0.5 right-0 w-0 h-[1px] bg-current transition-all duration-300 sm:group-hover:w-full"></span>
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-300 sm:group-hover:-translate-x-1">←</span>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
