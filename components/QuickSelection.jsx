import { Clock, ShoppingBag, Building2 } from 'lucide-react'
import Link from 'next/link'
import { MotionSection, StaggerGroup, StaggerItem } from './Motion'

const plans = [
  {
    id: 'froshgahi',
    title: 'فروشگاهی',
    subtitle: 'فروشگاه اینترنتی حرفه‌ای',
    icon: ShoppingBag,
    badge: 'شروع از ۲۵ میلیون',
    delivery: '۷ روز تا ۳ ماه',
    link: '/plans/froshgahi',
    features: ['۳ پلن اقتصادی، حرفه‌ای و اختصاصی', 'درگاه پرداخت', 'دامنه .ir رایگان', 'مدیریت محصولات'],
  },
  {
    id: 'sherkati',
    title: 'شرکتی',
    subtitle: 'سایت سازمانی مدرن',
    icon: Building2,
    badge: 'شروع از ۲۵ میلیون',
    delivery: '۷ روز تا ۳ ماه',
    link: '/plans/sherkati',
    features: ['۳ پلن اقتصادی، حرفه‌ای و اختصاصی', 'طراحی اختصاصی', 'دامنه .ir رایگان', 'مدیریت محتوا'],
  },
]

export default function QuickSelection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 md:h-screen min-h-screen flex flex-col justify-center md:snap-center bg-almond-silk/20 dark:bg-dusty-grape/10" dir="rtl">
      <div className="max-w-3xl mx-auto w-full">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">انتخاب سریع</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12">کدوم پلن مناسب کسب‌وکارته؟</p>
        </MotionSection>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((p) => {
            const IconComp = p.icon
            return (
              <StaggerItem key={p.id} className="flex">
                <div className="flex flex-col flex-1 bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 sm:p-8 shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300">
                  <div className="mb-6 text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComp className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                      <span className="text-sm text-dusty-grape dark:text-almond-silk font-medium">{p.subtitle}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                    <ul className="space-y-2">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                          <span className="w-1.5 h-1.5 rounded-full bg-dusty-grape dark:bg-almond-silk shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3 mb-6 text-right">
                    <div className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{p.delivery}</span>
                    </div>
                  </div>
                  <div className="bg-dusty-grape/10 dark:bg-parchment/10 rounded-xl p-3 mb-6 text-right">
                    <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium">شامل دامنه .ir رایگان و گواهی SSL</span>
                  </div>
                  <div className="mt-auto">
                    <Link href={p.link} className="block w-full text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20">
                      مشاهده پلن‌ها
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
