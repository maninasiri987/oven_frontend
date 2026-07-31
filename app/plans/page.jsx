import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChevronLeft, ShoppingBag, Building2 } from 'lucide-react'
import categories from '@/data/plans'

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64" />,
})

export default function Plans() {
  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto" dir="rtl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">پلن‌های Oven</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-4 reveal" data-delay="50">قیمت‌گذاری شفاف و بدون پنهانکاری</p>
          <p className="text-dusty-grape/70 dark:text-almond-silk/70 text-center text-sm mb-16 reveal" data-delay="70">همه پلن‌ها شامل دامنه <strong className="text-space-indigo dark:text-parchment font-semibold">.ir رایگان</strong> و گواهی SSL هستند</p>

          <div className="space-y-20">
            {categories.map((cat, ci) => {
              const IconComp = cat.icon === 'ShoppingBag' ? ShoppingBag : Building2
              return (
                <div key={cat.id}>
                  <div className="text-center mb-10 reveal" data-delay={ci * 100}>
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-space-indigo/5 dark:bg-parchment/5 flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-space-indigo dark:text-parchment" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{cat.title}</h2>
                    <p className="text-dusty-grape dark:text-almond-silk max-w-lg mx-auto">{cat.shortDesc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cat.plans.map((plan, pi) => (
                      <div
                        key={plan.id}
                        className={`relative bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border ${
                          plan.badge === 'محبوب‌ترین'
                            ? 'border-space-indigo/30 dark:border-parchment/30 ring-2 ring-space-indigo/15 dark:ring-parchment/15'
                            : 'border-dusty-grape/20 dark:border-dusty-grape/30'
                        } rounded-2xl p-6 md:p-8 reveal flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-dusty-grape/15 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50`}
                        data-delay={ci * 100 + pi * 80}
                      >
                        {plan.badge && (
                          <span className={`absolute -top-3 right-6 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md ${
                            plan.badge === 'محبوب‌ترین'
                              ? 'bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo'
                              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          }`}>
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
                          <div className="text-xs text-dusty-grape/60 dark:text-almond-silk/60 mt-1">تحویل: {plan.deliveryTime}</div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            دامنه .ir رایگان
                          </div>
                          <div className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            گواهی SSL رایگان
                          </div>
                          {plan.features.slice(0, 3).map((f, fi) => (
                            <div key={fi} className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-dusty-grape dark:bg-almond-silk shrink-0"></span>
                              {f}
                            </div>
                          ))}
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
                    ))}
                  </div>

                  <div className="text-center mt-8 reveal" data-delay={ci * 100 + 300}>
                    <Link
                      href={`/plans/${cat.id}`}
                      className="inline-flex items-center gap-1 text-sm text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment transition-colors"
                    >
                      <span>مشاهده همه جزئیات {cat.title}</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-sm text-dusty-grape dark:text-almond-silk text-center mt-16 reveal" data-delay="100">
            دنبال خدمات تخصصی مثل سئو، پشتیبانی یا نجات سایت هستید؟{' '}
            <Link href="/services" className="text-space-indigo dark:text-parchment font-semibold hover:underline underline-offset-4 transition-all duration-200">مشاهده خدمات</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
