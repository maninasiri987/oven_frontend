'use client'
import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Building2 } from 'lucide-react'
import { MotionSection } from './Motion'
import Checkbox from './Checkbox'

const plans = [
  { cat: 'فروشگاهی', catId: 'froshgahi', id: 'eghtesadi', title: 'اقتصادی', price: 25000000, priceLabel: '۲۵٬۰۰۰٬۰۰۰' },
  { cat: 'فروشگاهی', catId: 'froshgahi', id: 'herfei', title: 'حرفه‌ای', price: 85000000, priceLabel: '۸۵٬۰۰۰٬۰۰۰' },
  { cat: 'فروشگاهی', catId: 'froshgahi', id: 'ekhtesasi', title: 'اختصاصی', price: 115000000, priceLabel: '۱۱۵٬۰۰۰٬۰۰۰' },
  { cat: 'شرکتی', catId: 'sherkati', id: 'eghtesadi', title: 'اقتصادی', price: 25000000, priceLabel: '۲۵٬۰۰۰٬۰۰۰' },
  { cat: 'شرکتی', catId: 'sherkati', id: 'herfei', title: 'حرفه‌ای', price: 85000000, priceLabel: '۸۵٬۰۰۰٬۰۰۰' },
  { cat: 'شرکتی', catId: 'sherkati', id: 'ekhtesasi', title: 'اختصاصی', price: 115000000, priceLabel: '۱۱۵٬۰۰۰٬۰۰۰' },
]

const addons = [
  { key: 'seo', label: 'سئو (+۱۵٬۰۰۰٬۰۰۰)', price: 15000000 },
  { key: 'support', label: 'پشتیبانی ماهانه (+۱۵٬۰۰۰٬۰۰۰)', price: 15000000 },
  { key: 'multilang', label: 'چند زبانه (+۵٬۰۰۰٬۰۰۰)', price: 5000000 },
  { key: 'custom-form', label: 'فرم سفارشی (+۲٬۰۰۰٬۰۰۰)', price: 2000000 },
  { key: 'blog', label: 'وبلاگ (+۳٬۰۰۰٬۰۰۰)', price: 3000000 },
  { key: 'animation', label: 'انیمیشن (+۲٬۵۰۰٬۰۰۰)', price: 2500000 },
]

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dusty-grape dark:focus-visible:ring-almond-silk'

function formatPrice(n) {
  return n.toLocaleString('fa-IR') + ' تومان'
}

export default function Estimate() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedAddons, setSelectedAddons] = useState({})
  const [showAddons, setShowAddons] = useState(false)

  const toggleAddon = useCallback((key) => setSelectedAddons(prev => ({ ...prev, [key]: !prev[key] })), [])

  const total = useMemo(() => {
    if (!selectedPlan) return 0
    const plan = plans.find(p => p.id === selectedPlan.id && p.catId === selectedPlan.catId)
    let sum = plan ? plan.price : 0
    addons.forEach(a => { if (selectedAddons[a.key]) sum += a.price })
    return sum
  }, [selectedPlan, selectedAddons])

  const projectHref = useMemo(() => {
    if (!selectedPlan) return '/project'
    const addonList = addons.filter(a => selectedAddons[a.key]).map(a => a.key)
    return `/project?service=${selectedPlan.catId}&plan=${selectedPlan.id}${addonList.length ? `&features=${addonList.join(',')}` : ''}`
  }, [selectedPlan, selectedAddons])

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

  const categories = [
    { id: 'froshgahi', title: 'فروشگاهی', icon: ShoppingBag },
    { id: 'sherkati', title: 'شرکتی', icon: Building2 },
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-10 md:min-h-screen w-full flex flex-col justify-center md:snap-center" dir="rtl">
      <div className="max-w-3xl mx-auto w-full">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">برآورد اولیه</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12">بدون تعهد، هزینه تقریبی پروژه‌تون رو ببینید</p>
        </MotionSection>
        <MotionSection delay={0.1}>
          {/* Step 1: Category */}
          <div className="mb-8 text-right">
            <label className="text-sm font-medium mb-4 block">نوع وب‌سایت</label>
            <div className="flex flex-col sm:flex-row gap-3">
              {categories.map(c => {
                const IconComp = c.icon
                return (
                <button key={c.id} type="button" aria-pressed={selectedPlan?.catId === c.id} onClick={() => { setSelectedPlan({ catId: c.id, id: null }); setSelectedAddons({}); setShowAddons(false) }} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 w-full text-right ${focusRing} ${selectedPlan?.catId === c.id ? 'border-dusty-grape dark:border-almond-silk bg-dusty-grape/5 dark:bg-almond-silk/5' : 'border-dusty-grape/20 dark:border-almond-silk/20'}`}>
                  <IconComp className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                  <span className="block text-sm font-medium">{c.title}</span>
                </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Plan */}
          {selectedPlan?.catId && (
            <div className="mb-8 text-right" style={fadeStyle(true)}>
              <label className="text-sm font-medium mb-4 block">انتخاب پلن</label>
              <div className="flex flex-col gap-3">
                {plans.filter(p => p.catId === selectedPlan.catId).map((p, i) => (
                  <button key={p.id} type="button" aria-pressed={selectedPlan.id === p.id} onClick={() => { setSelectedPlan({ catId: p.catId, id: p.id }); setSelectedAddons({}); setTimeout(() => setShowAddons(true), 50) }} className={cardClass(selectedPlan.id === p.id)} style={itemFadeStyle(!!selectedPlan.catId, i)}>
                    <span>
                      <span className="block text-sm font-medium">{p.title}</span>
                      <span className="block text-xs text-dusty-grape dark:text-almond-silk/60">{p.priceLabel} تومان</span>
                    </span>
                    <Checkbox checked={selectedPlan.id === p.id} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {selectedPlan?.id && (
            <div className="mb-8 text-right" style={fadeStyle(showAddons)}>
              <label className="text-sm font-medium mb-4 block">افزودنی‌ها</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((a, i) => (
                  <button key={a.key} type="button" aria-pressed={!!selectedAddons[a.key]} onClick={() => toggleAddon(a.key)} className={cardClass(!!selectedAddons[a.key])} style={itemFadeStyle(showAddons, i)}>
                    <span>{a.label}</span>
                    <Checkbox checked={!!selectedAddons[a.key]} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No plan selected state */}
          {!selectedPlan?.catId && (
            <div className="text-center py-12 text-dusty-grape dark:text-almond-silk/60">
              <p className="text-sm">ابتدا نوع و سپس پلن مورد نظر خود را انتخاب کنید</p>
            </div>
          )}

          {/* Total */}
          {selectedPlan?.id && (
            <div className="border-t border-dusty-grape/10 dark:border-almond-silk/10 pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-lg sm:text-xl font-semibold">{formatPrice(total)}</span>
                <span className="text-sm text-dusty-grape dark:text-almond-silk">برآورد اولیه</span>
              </div>
              <div className="text-xs text-dusty-grape/60 dark:text-almond-silk/60 mt-1">* شامل دامنه .ir رایگان و گواهی SSL</div>
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
