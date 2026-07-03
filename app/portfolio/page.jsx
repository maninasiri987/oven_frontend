'use client'
import Footer from '@/components/Footer'
import { ShoppingBag, HeartPulse, Rocket, Store, GraduationCap, Building2 } from 'lucide-react'

const projects = [
  { icon: ShoppingBag, title: 'فروشگاهی', desc: 'فروشگاه آنلاین مدرن با تجربه خرید روان.', type: 'نمونه مفهومی', delay: '0' },
  { icon: HeartPulse, title: 'کلینیک', desc: 'سایت کلینیک پزشکی با نوبت‌دهی آنلاین.', type: 'نمونه مفهومی', delay: '80' },
  { icon: Rocket, title: 'استارتاپ', desc: 'لندینگ پیج استارتاپ با تمرکز بر تبدیل.', type: 'نمونه مفهومی', delay: '160' },
  { icon: Store, title: 'خدماتی', desc: 'سایت شرکت خدماتی با فرم درخواست آنلاین.', type: 'نمونه مفهومی', delay: '240' },
  { icon: GraduationCap, title: 'آموزشی', desc: 'پلتفرم آموزش آنلاین با سیستم دوره.', type: 'نمونه مفهومی', delay: '320' },
  { icon: Building2, title: 'شرکتی', desc: 'سایت شرکتی مدرن با معرفی خدمات.', type: 'نمونه مفهومی', delay: '400' },
]

export default function PortfolioPage() {
  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto" dir="rtl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">نمونه کار</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-16 reveal" data-delay="50">پروژه‌های مفهومی Oven</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl overflow-hidden reveal shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300" data-delay={p.delay}>
                <div className="h-48 bg-gradient-to-br from-dusty-grape/20 to-almond-silk/20 dark:from-dusty-grape/30 dark:to-space-indigo flex items-center justify-center">
                  <p.icon className="w-12 h-12 text-dusty-grape/40 dark:text-almond-silk/40" />
                </div>
                <div className="p-5 text-right">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    <span className="text-xs bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk px-2 py-0.5 rounded-full">{p.type}</span>
                  </div>
                  <p className="text-sm text-dusty-grape dark:text-almond-silk/80">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
