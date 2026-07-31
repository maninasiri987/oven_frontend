'use client'
import { use, useMemo } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShoppingBag, Building2, Check, ChevronLeft, Globe } from 'lucide-react'
import categories from '@/data/plans'
import Footer from '@/components/Footer'

const iconMap = { ShoppingBag, Building2 }

const badges = {
  'محبوب‌ترین': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'پرفروش‌ترین': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

const planFeatures = {
  eghtesadi: [
    { label: 'نوع', value: 'قالبی آماده' },
    { label: 'مدت تحویل', value: '۷ تا ۱۰ روز' },
    { label: 'دامنه رایگان', value: '.ir' },
    { label: 'گواهی SSL', value: 'رایگان' },
    { label: ' مدیریت', value: 'آسان (وردپرس)' },
  ],
  herfei: [
    { label: 'نوع', value: 'نیمه اختصاصی' },
    { label: 'مدت تحویل', value: '۲ تا ۴ هفته' },
    { label: 'دامنه رایگان', value: '.ir' },
    { label: 'گواهی SSL', value: 'رایگان' },
    { label: ' مدیریت', value: 'اختصاصی' },
  ],
  ekhtesasi: [
    { label: 'نوع', value: 'کاملاً اختصاصی' },
    { label: 'مدت تحویل', value: '۲ تا ۳ ماه' },
    { label: 'دامنه رایگان', value: '.ir' },
    { label: 'گواهی SSL', value: 'رایگان' },
    { label: ' مدیریت', value: 'پیشرفته' },
  ],
}


export default function CategoryPage({ params }) {
  const { category } = use(params)
  const cat = useMemo(() => categories.find(c => c.id === category), [category])
  if (!cat) notFound()

  const IconComponent = iconMap[cat.icon] || Building2

  return (
    <>
      <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto" dir="rtl">
          <div className="text-center mb-12 reveal">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-space-indigo/5 dark:bg-parchment/5 flex items-center justify-center">
              <IconComponent className="w-7 h-7 text-space-indigo dark:text-parchment" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-3">{cat.title}</h1>
            <p className="text-dusty-grape dark:text-almond-silk max-w-2xl mx-auto">{cat.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cat.plans.map((plan, i) => {
              const featList = planFeatures[plan.id]
              return (
                <div key={plan.id} className={`relative bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 md:p-8 reveal flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-dusty-grape/15 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 ${plan.badge === 'محبوب‌ترین' ? 'ring-2 ring-space-indigo/20 dark:ring-parchment/20 scale-[1.02]' : ''}`} data-delay={i * 80}>
                  {plan.badge && (
                    <span className={`absolute -top-3 right-6 text-[11px] font-semibold px-3 py-1 rounded-full shadow-md ${badges[plan.badge] || 'bg-space-indigo text-parchment'}`}>
                      {plan.badge}
                    </span>
                  )}

                  <div className="text-right mb-6">
                    <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium bg-dusty-grape/10 dark:bg-parchment/10 px-3 py-1 rounded-full">{plan.type}</span>
                    <h3 className="text-xl font-semibold mt-3 mb-2">{plan.title}</h3>
                    <p className="text-sm text-dusty-grape dark:text-almond-silk/80">{plan.shortDesc}</p>
                  </div>

                  <div className="text-right mb-6">
                    <div className="text-sm text-dusty-grape dark:text-almond-silk/80">شروع از</div>
                    <div className="text-3xl font-semibold">{plan.priceLabel} <span className="text-sm font-normal">تومان</span></div>
                    <div className="text-xs text-dusty-grape/60 dark:text-almond-silk/60 mt-1">قابل پرداخت در اقساط</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {featList.map((f, fi) => (
                      <div key={fi} className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                        <span>{f.label}</span>
                        <span className="font-medium text-space-indigo dark:text-parchment">{f.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-8">
                    {plan.features.slice(0, 4).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                    <div className="text-sm text-space-indigo dark:text-parchment font-medium pt-1">
                      <Link href={`/plans/${cat.id}/${plan.id}`} className="hover:underline underline-offset-2 transition-all duration-200">
                        + مشاهده همه امکانات
                      </Link>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    <Link
                      href={`/plans/${cat.id}/${plan.id}`}
                      className="block w-full text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20"
                    >
                      مشاهده جزئیات
                    </Link>
                    <Link
                      href={`/project?service=${cat.id}&plan=${plan.id}`}
                      className="block w-full text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-200"
                    >
                      ثبت پروژه
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cross-sell to other category */}
          <div className="mt-16 text-center reveal" data-delay="50">
            <p className="text-sm text-dusty-grape dark:text-almond-silk mb-4">
              {cat.id === 'froshgahi' ? 'به دنبال سایت شرکتی هستید؟' : 'به دنبال فروشگاه اینترنتی هستید؟'}
            </p>
            <Link
              href={`/plans/${cat.id === 'froshgahi' ? 'sherkati' : 'froshgahi'}`}
              className="inline-flex items-center gap-2 text-space-indigo dark:text-parchment font-semibold hover:underline underline-offset-4 transition-all duration-200"
            >
              <span>{cat.id === 'froshgahi' ? 'مشاهده پلن‌های شرکتی' : 'مشاهده پلن‌های فروشگاهی'}</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Free domain banner */}
          <div className="mt-12 text-center bg-gradient-to-r from-dusty-grape/10 via-space-indigo/5 to-dusty-grape/10 dark:from-dusty-grape/20 dark:via-parchment/5 dark:to-dusty-grape/20 rounded-2xl p-8 reveal" data-delay="100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-6 h-6 text-space-indigo dark:text-parchment" />
              <p className="text-lg font-semibold">همه پلن‌ها شامل دامنه .ir رایگان هستند</p>
            </div>
            <p className="text-sm text-dusty-grape dark:text-almond-silk">یک سال دامنه رایگان به همراه گواهی SSL برای همه پلن‌ها</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
