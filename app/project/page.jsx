'use client'
import Footer from '@/components/Footer'
import Checkbox from '@/components/Checkbox'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const plans = [
  { value: 'fast', name: 'Fast Web', price: '۶٬۹۰۰٬۰۰۰' },
  { value: 'pro', name: 'Pro Web', price: '۲۴٬۹۰۰٬۰۰۰' },
  { value: 'web', name: 'خدمات وب', price: 'نیازمند بررسی' },
]

const fastFeatures = [
  { key: 'seo', label: 'سئو' },
  { key: 'sections', label: 'بخش‌های سفارشی' },
  { key: 'pages', label: 'صفحات اضافه' },
  { key: 'blog', label: 'وبلاگ' },
  { key: 'support', label: 'پشتیبانی' },
  { key: 'animation', label: 'انیمیشن' },
]

const proFeatures = [
  { key: 'admin', label: 'پنل مدیریت' },
  { key: 'seo', label: 'سئو حرفه‌ای' },
  { key: 'multilang', label: 'چند زبانه' },
  { key: 'animation', label: 'انیمیشن' },
  { key: 'custom', label: 'سیستم سفارشی' },
]

const webFeatures = [
  { key: 'seo', label: 'سئو' },
  { key: 'sections', label: 'بخش‌های سفارشی' },
  { key: 'pages', label: 'صفحات اضافه' },
  { key: 'blog', label: 'وبلاگ' },
  { key: 'support', label: 'پشتیبانی' },
  { key: 'animation', label: 'انیمیشن' },
]

function ProjectForm() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service')
  const initialPlan = serviceParam === 'fast' ? 'fast' : serviceParam === 'pro' ? 'pro' : 'web'
  const initialStep = searchParams.get('step') === '2' ? 2 : searchParams.get('step') === '3' ? 3 : 1
  const initialFeatures = searchParams.get('features')?.split(',').filter(Boolean) || []

  const [step, setStep] = useState(initialStep)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState(() => ({
    plan: initialPlan,
    features: initialFeatures,
    description: '',
    phone: '',
  }))

  const currentFeatures = form.plan === 'fast' ? fastFeatures : form.plan === 'pro' ? proFeatures : webFeatures

  const toggleFeature = (key) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(key)
        ? prev.features.filter(f => f !== key)
        : [...prev.features, key]
    }))
  }

  const canNext = () => {
    if (step === 1) return form.plan !== ''
    if (step === 2) return true
    if (step === 3) return true
    if (step === 4) return form.phone.length >= 10
    return true
  }

  const handleNext = () => {
    if (!canNext()) return
    setDir(1)
    setStep(step + 1)
  }

  const handleBack = () => {
    setDir(-1)
    setStep(step - 1)
  }

  const handleSubmit = () => {
    setStep(5)
  }

  const steps = ['انتخاب نوع پروژه', 'انتخاب امکانات', 'توضیح کوتاه', 'شماره تماس', 'تایید']

  const stepMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }

  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">ثبت پروژه</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12 reveal" data-delay="50">اطلاعات پروژه خود را وارد کنید</p>

          {/* Progress */}
          <div className="mb-10">
            <div className="relative flex justify-between">
              {steps.map((s, i) => {
                const num = i + 1
                const currentMapped = stepMap[step]
                const done = num < currentMapped
                const current = num === currentMapped
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                      done || current
                        ? 'bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo'
                        : 'bg-dusty-grape/20 dark:bg-almond-silk/20 text-dusty-grape/50 dark:text-almond-silk/50'
                    } ${current ? 'ring-[3px] ring-space-indigo/20 dark:ring-parchment/20 scale-110' : ''}`}>
                      {done ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : num}
                    </div>
                    <span className={`text-[10px] mt-1.5 leading-tight transition-colors duration-300 ${
                      current
                        ? 'text-space-indigo dark:text-parchment font-semibold'
                        : done
                          ? 'text-dusty-grape/50 dark:text-almond-silk/50'
                          : 'text-dusty-grape/30 dark:text-almond-silk/30'
                    }`}>{s}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                {step === 1 && (
                  <motion.div
                    key={1}
                    custom={dir}
                    variants={{
                      enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-right"
                  >
                    <h3 className="text-lg font-semibold mb-4">انتخاب نوع پروژه</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {plans.map(p => (
                        <label key={p.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${form.plan === p.value ? 'border-space-indigo dark:border-parchment bg-space-indigo/5 dark:bg-parchment/5' : 'border-dusty-grape/20 dark:border-almond-silk/20'}`} dir="rtl">
                          <Checkbox checked={form.plan === p.value} onChange={() => setForm(prev => ({ ...prev, plan: p.value, features: [] }))} />
                          <div>
                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-dusty-grape dark:text-almond-silk/60">{p.price} تومان</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {form.plan === 'web' && (
                      <p className="text-xs text-dusty-grape dark:text-almond-silk/70 mt-3" dir="rtl">اطلاعات و شماره تماس خود را ثبت کنید. پس از بررسی درخواست، برای هماهنگی و اعلام هزینه با شما تماس خواهیم گرفت.</p>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key={2}
                    custom={dir}
                    variants={{
                      enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-right"
                  >
                    <h3 className="text-lg font-semibold mb-4">انتخاب امکانات</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentFeatures.map(f => (
                        <label key={f.key} className="flex items-center justify-end gap-3 text-sm p-3 rounded-lg hover:bg-dusty-grape/5 dark:hover:bg-almond-silk/5 cursor-pointer transition-colors">
                          <span>{f.label}</span>
                          <Checkbox checked={form.features.includes(f.key)} onChange={() => toggleFeature(f.key)} />
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key={3}
                    custom={dir}
                    variants={{
                      enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-right"
                  >
                    <h3 className="text-lg font-semibold mb-4">توضیح کوتاه <span className="text-sm font-normal text-dusty-grape dark:text-almond-silk">(اختیاری)</span></h3>
                    <textarea
                      value={form.description}
                      onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="توضیحات پروژه خود را بنویسید..."
                      dir="rtl"
                      spellCheck={false}
                      className="w-full h-32 p-4 rounded-xl border border-dusty-grape/20 dark:border-almond-silk/20 bg-transparent text-sm text-right resize-none focus:outline-none focus:border-space-indigo dark:focus:border-parchment transition-colors"
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key={4}
                    custom={dir}
                    variants={{
                      enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-right"
                  >
                    <h3 className="text-lg font-semibold mb-4">شماره تماس</h3>
                    <input
                      type="tel"
                      dir="ltr"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={11}
                      value={form.phone}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '')
                        setForm(prev => ({ ...prev, phone: val }))
                      }}
                      placeholder="09123456789"
                      className="w-full p-4 rounded-xl border border-dusty-grape/20 dark:border-almond-silk/20 bg-transparent text-sm tracking-wider focus:outline-none focus:border-space-indigo dark:focus:border-parchment transition-colors"
                    />
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key={5}
                    custom={dir}
                    variants={{
                      enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">پروژه ثبت شد!</h3>
                    <p className="text-sm text-dusty-grape dark:text-almond-silk mb-6">به زودی با شما تماس می‌گیریم.</p>
                    <Link href="/" className="inline-block bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150">صفحه اصلی</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {step < 5 && (
              <div className="flex items-center justify-between mt-8">
                  {step > 1 ? (
                    <button onClick={handleBack} className="text-sm text-dusty-grape dark:text-almond-silk hover:underline cursor-pointer">مرحله قبل</button>
                  ) : <div></div>}
                  {step < 4 ? (
                    <button onClick={handleNext} disabled={!canNext()} className="bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">مرحله بعد</button>
                ) : (
                  <button onClick={handleSubmit} disabled={!canNext()} className="bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">ارسال</button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function Project() {
  return (
    <Suspense>
      <ProjectForm />
    </Suspense>
  )
}
