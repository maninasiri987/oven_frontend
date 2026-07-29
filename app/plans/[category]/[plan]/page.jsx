'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Users, Star, Layers, HelpCircle, ChevronDown, ShoppingBag, Building2 } from 'lucide-react'
import categories from '@/data/plans'
import Footer from '@/components/Footer'

const iconMap = { ShoppingBag, Building2 }

export default function PlanDetailPage({ params }) {
  const { category, plan } = use(params)
  const cat = categories.find(c => c.id === category)
  if (!cat) notFound()
  const planData = cat.plans.find(p => p.id === plan)
  if (!planData) notFound()

  const [openFaq, setOpenFaq] = useState(null)
  const IconComponent = iconMap[cat.icon] || Building2

  return (
    <>
      <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto" dir="rtl">
          {/* Header */}
          <div className="mb-10 text-right reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-space-indigo/5 dark:bg-parchment/5 flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-space-indigo dark:text-parchment" />
              </div>
              <Link href={`/plans/${cat.id}`} className="text-sm text-dusty-grape dark:text-almond-silk hover:text-space-indigo dark:hover:text-parchment transition-colors">
                {cat.title}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium bg-dusty-grape/10 dark:bg-parchment/10 px-3 py-1 rounded-full">{planData.type}</span>
              <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">دامنه .ir رایگان</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold mb-3">{planData.title}</h1>
            <p className="text-dusty-grape/80 dark:text-almond-silk/70 text-base leading-relaxed max-w-2xl">{planData.description}</p>
          </div>

          {/* Price + CTA */}
          <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 mb-12 reveal">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="text-right">
                <div className="text-sm text-dusty-grape dark:text-almond-silk/80">شروع قیمت از</div>
                <div className="text-4xl font-semibold">{planData.priceLabel} <span className="text-base font-normal">تومان</span></div>
                <div className="text-sm text-dusty-grape/60 dark:text-almond-silk/60 mt-1">زمان تحویل: {planData.deliveryTime}</div>
              </div>
              <Link
                href={`/project?service=${cat.id}&plan=${plan.id}`}
                className="shrink-0 bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-base font-medium px-8 py-3.5 rounded-xl hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20"
              >
                ثبت پروژه
              </Link>
            </div>
          </div>

          <div className="space-y-12">
            {/* مناسب چه کسانی */}
            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Users className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">این پلن مناسب چه کسانی است؟</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {planData.suitedFor.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                    <span className="w-2 h-2 rounded-full bg-dusty-grape dark:bg-almond-silk shrink-0"></span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* مزایا */}
            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="50">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Star className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">مزایا و امکانات</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {planData.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-dusty-grape dark:text-almond-silk/80 text-right leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {b}
                  </div>
                ))}
              </div>
            </section>

            {/* ویژگی‌ها */}
            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="100">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Layers className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">ویژگی‌های کلیدی</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {planData.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                    <span className="w-2 h-2 rounded-full bg-space-indigo dark:bg-parchment shrink-0"></span>
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* فرآیند */}
            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="150">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Layers className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">فرآیند پروژه</h2>
              </div>
              <div className="relative space-y-6">
                <div className="absolute right-[15px] top-4 bottom-4 w-px bg-dusty-grape/20 dark:bg-almond-silk/20"></div>
                {planData.process.map((p, i) => (
                  <div key={i} className="flex gap-4 text-right">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-dusty-grape dark:bg-almond-silk flex items-center justify-center text-sm font-semibold text-parchment dark:text-space-indigo">{p.step}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{p.title}</h3>
                      <p className="text-sm text-dusty-grape/80 dark:text-almond-silk/70 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* تکنولوژی‌ها */}
            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="200">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Star className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">تکنولوژی‌های استفاده‌شده</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {planData.technologies.map((t, i) => (
                  <span key={i} className="inline-flex items-center text-sm bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* سوالات متداول */}
            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="250">
              <div className="flex items-center gap-3 mb-6 text-right">
                <HelpCircle className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">سوالات متداول</h2>
              </div>
              <div className="space-y-3">
                {planData.faq.map((item, i) => (
                  <div key={i}>
                    <div className={`bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-white/20 dark:border-dusty-grape/30 rounded-xl overflow-hidden ${openFaq === i ? 'open' : ''}`}>
                      <button
                        type="button"
                        aria-expanded={openFaq === i}
                        aria-controls={`plan-faq-answer-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-right cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dusty-grape dark:focus-visible:ring-almond-silk"
                      >
                        <span className="text-sm font-medium">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-dusty-grape dark:text-almond-silk shrink-0 transition-transform duration-250 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <div id={`plan-faq-answer-${i}`} role="region" className={`faq-answer ${openFaq === i ? 'open' : 'closed'} px-5 pb-5`}>
                        <p className="text-sm text-dusty-grape dark:text-almond-silk/80 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Other plans in this category */}
            <div className="text-center py-8 reveal" data-delay="300">
              <p className="text-dusty-grape dark:text-almond-silk mb-4">سایر پلن‌های {cat.title}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {cat.plans.filter(p => p.id !== plan).map(p => (
                  <Link
                    key={p.id}
                    href={`/plans/${cat.id}/${p.id}`}
                    className="inline-flex items-center gap-2 text-sm border border-dusty-grape/20 dark:border-almond-silk/20 text-dusty-grape dark:text-almond-silk px-4 py-2 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-200"
                  >
                    {p.title}
                    <span className="text-xs opacity-60">{p.priceLabel} تومان</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cross category link */}
            <div className="text-center pb-8 reveal" data-delay="350">
              <Link
                href={`/plans/${cat.id === 'froshgahi' ? 'sherkati' : 'froshgahi'}`}
                className="text-space-indigo dark:text-parchment font-semibold hover:underline underline-offset-4 transition-all duration-200"
              >
                {cat.id === 'froshgahi' ? 'مشاهده پلن‌های شرکتی' : 'مشاهده پلن‌های فروشگاهی'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
