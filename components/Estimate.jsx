'use client'
import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MotionSection } from './Motion'
import Checkbox from './Checkbox'

const fastPrices = { base: 6900000, seo: 2490000, sections: 1490000, pages: 590000, blog: 990000, support: 790000, animation: 1190000 }
const proPrices = { base: 24900000, admin: 3900000, seo: 3900000, multilang: 2900000, animation: 2490000, custom: 6900000 }

const fastFeatures = [
  { key: 'seo', label: 'سئو (+۲٬۴۹۰٬۰۰۰)' },
  { key: 'sections', label: 'بخش‌های سفارشی (+۱٬۴۹۰٬۰۰۰)' },
  { key: 'pages', label: 'صفحات اضافه (+۵۹۰٬۰۰۰)' },
  { key: 'blog', label: 'وبلاگ (+۹۹۰٬۰۰۰)' },
  { key: 'support', label: 'پشتیبانی (+۷۹۰٬۰۰۰)' },
  { key: 'animation', label: 'انیمیشن (+۱٬۱۹۰٬۰۰۰)' },
]

const proFeatures = [
  { key: 'admin', label: 'پنل مدیریت (+۳٬۹۰۰٬۰۰۰)' },
  { key: 'seo', label: 'سئو حرفه‌ای (+۳٬۹۰۰٬۰۰۰)' },
  { key: 'multilang', label: 'چند زبانه (+۲٬۹۰۰٬۰۰۰)' },
  { key: 'animation', label: 'انیمیشن (+۲٬۴۹۰٬۰۰۰)' },
  { key: 'custom', label: 'سیستم سفارشی (+۶٬۹۰۰٬۰۰۰)' },
]

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dusty-grape dark:focus-visible:ring-almond-silk'

function formatPrice(n) {
  return n.toLocaleString('fa-IR') + ' تومان'
}

export default function Estimate() {
  const [plan, setPlan] = useState('')
  const [features, setFeatures] = useState({})
  const [firstTime, setFirstTime] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  const toggleFeature = useCallback((key) => setFeatures(prev => ({ ...prev, [key]: !prev[key] })), [])

  const total = useMemo(() => {
    if (!plan) return 0
    const prices = plan === 'fast' ? fastPrices : proPrices
    let sum = prices.base
    const feats = plan === 'fast' ? fastFeatures : proFeatures
    feats.forEach(f => { if (features[f.key]) sum += prices[f.key] })
    if (plan === 'fast' && firstTime) sum = Math.round(sum * 0.85)
    return sum
  }, [plan, features, firstTime])

  const projectHref = useMemo(() => {
    const list = (plan === 'fast' ? fastFeatures : proFeatures)
      .filter(f => features[f.key])
      .map(f => f.key)
    return `/project?service=${plan}${list.length ? `&features=${list.join(',')}` : ''}`
  }, [plan, features])

  const fadeStyle = (show) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  })
  const itemFadeStyle = (show, i) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(8px)',
    transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
  })

  const cardClass = (active) =>
    `flex items-center justify-between gap-3 text-sm p-4 rounded-xl border cursor-pointer transition-all duration-200 w-full text-right ${focusRing} ${
      active
        ? 'border-dusty-grape dark:border-almond-silk bg-dusty-grape/5 dark:bg-almond-silk/5'
        : 'border-dusty-grape/15 dark:border-almond-silk/15 hover:border-dusty-grape/40 dark:hover:border-almond-silk/40'
    }`

  const renderFeatureGrid = (list) => (
    <>
      <label className="text-sm font-medium mb-4 block">امکانات اضافی</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map((f, i) => (
          <button key={f.key} type="button" aria-pressed={!!features[f.key]} onClick={() => toggleFeature(f.key)} className={cardClass(!!features[f.key])} style={itemFadeStyle(showFeatures, i)}>
            <span>{f.label}</span>
            <Checkbox checked={!!features[f.key]} />
          </button>
        ))}
      </div>
    </>
  )

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-10 md:min-h-screen w-full flex flex-col justify-center md:snap-center" dir="rtl">
      <div className="max-w-3xl mx-auto w-full">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">برآورد اولیه</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12">بدون تعهد، هزینه تقریبی پروژه‌تون رو ببینید</p>
        </MotionSection>
        <MotionSection delay={0.1}>
          <div className="mb-8 text-right">
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { value: 'fast', name: 'Fast Web', sub: 'وردپرسی' },
                { value: 'pro', name: 'Pro Web', sub: 'اختصاصی' },
              ].map(p => (
                <button key={p.value} type="button" aria-pressed={plan === p.value} onClick={() => { setPlan(p.value); setFeatures({}); setFirstTime(false); setShowFeatures(false); setTimeout(() => setShowFeatures(true), 50) }} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 w-full text-right ${focusRing} ${plan === p.value ? 'border-dusty-grape dark:border-almond-silk bg-dusty-grape/5 dark:bg-almond-silk/5' : 'border-dusty-grape/20 dark:border-almond-silk/20'}`}>
                  <Checkbox checked={plan === p.value} />
                  <span>
                    <span className="block text-sm font-medium">{p.name}</span>
                    <span className="block text-xs text-dusty-grape dark:text-almond-silk/60">{p.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {plan === 'fast' && (
            <div className="mb-8 text-right" style={fadeStyle(showFeatures)}>
              {renderFeatureGrid(fastFeatures)}
              <button type="button" aria-pressed={firstTime} onClick={() => setFirstTime(!firstTime)} className={`flex items-center justify-between gap-3 text-sm p-4 mt-4 rounded-xl cursor-pointer transition-all duration-200 w-full text-right ${focusRing} ${firstTime ? 'bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700' : 'bg-green-50/50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-800/50 hover:border-green-300 dark:hover:border-green-700'}`} style={itemFadeStyle(showFeatures, fastFeatures.length)}>
                <span className="text-green-700 dark:text-green-400 font-medium">این اولین همکاری من با Oven است (۱۵٪ تخفیف)</span>
                <Checkbox checked={firstTime} green />
              </button>
            </div>
          )}

          {plan === 'pro' && (
            <div className="mb-8 text-right" style={fadeStyle(showFeatures)}>
              {renderFeatureGrid(proFeatures)}
            </div>
          )}

          {plan && (
            <div className="border-t border-dusty-grape/10 dark:border-almond-silk/10 pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-lg sm:text-xl font-semibold">{formatPrice(total)}</span>
                <span className="text-sm text-dusty-grape dark:text-almond-silk">برآورد اولیه</span>
              </div>
              <Link href={projectHref} className="mt-5 flex items-center justify-center gap-2 w-full bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-dusty-grape dark:hover:bg-almond-silk transition-all duration-200 hover:shadow-lg hover:shadow-dusty-grape/20">
                ثبت پروژه با همین مشخصات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}
        </MotionSection>
      </div>
    </section>
  )
}
