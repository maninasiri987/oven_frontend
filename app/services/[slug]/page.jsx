'use client'
import { useState, useRef, useEffect, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Check, Users, Star, Layers, HelpCircle, ShoppingBag, HeartPulse, Rocket, Store, GraduationCap, Building2 } from 'lucide-react'
import services from '@/data/services'
import Footer from '@/components/Footer'
import techIcons from '@/components/TechIcons'

function findService(slug) {
  return services.find(s => s.slug === slug)
}

export default function ServicePage({ params }) {
  const { slug } = use(params)
  const service = findService(slug)
  if (!service) notFound()

  const [openFaq, setOpenFaq] = useState(null)
  const galleryRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const galleryItems = 6

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    const onScroll = () => {
      const sl = Math.abs(el.scrollLeft)
      const itemW = el.scrollWidth / galleryItems
      const idx = Math.round(sl / itemW)
      setActiveSlide(Math.min(idx, galleryItems - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollGallery('left') }
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollGallery('right') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollToSlide = (idx) => {
    if (galleryRef.current) {
      const w = galleryRef.current.offsetWidth * 0.8
      galleryRef.current.scrollTo({ left: idx * (w + 16), behavior: 'smooth' })
    }
  }

  const scrollGallery = (dir) => {
    if (galleryRef.current) {
      const w = galleryRef.current.offsetWidth * 0.8
      galleryRef.current.scrollBy({ left: dir === 'right' ? w : -w, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Link href="/services" aria-label="بازگشت به خدمات" className="fixed top-4 left-4 z-[70] w-10 h-10 flex items-center justify-center rounded-full md:bg-white/80 md:dark:bg-space-indigo/80 md:backdrop-blur-sm border-0 md:border md:border-dusty-grape/20 md:dark:border-almond-silk/20 text-dusty-grape dark:text-almond-silk md:hover:bg-dusty-grape md:hover:text-parchment md:dark:hover:bg-almond-silk md:dark:hover:text-space-indigo transition-all duration-200">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto" dir="rtl">

          <div className="mb-8 text-right">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">{service.title}</h1>
            {service.deliveryTime && (
              <div className="text-sm text-dusty-grape/80 dark:text-almond-silk/70 mb-4">زمان تحویل: {service.deliveryTime}</div>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.technologies.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-medium bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk px-2.5 py-1.5 rounded-full">
                  {techIcons[t] || (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><text x="12" y="16" textAnchor="middle" fontSize="7">{t.charAt(0)}</text></svg>
                  )}
                  <span>{t}</span>
                </div>
                ))}
                <div className="shrink-0 w-1 h-1"></div>
              </div>
            <p className="text-dusty-grape/80 dark:text-almond-silk/70 text-base leading-relaxed max-w-2xl">{service.introduction}</p>
          </div>

          <div className="flex items-center justify-between mb-12" dir="rtl">
            <div className="text-xl font-semibold text-space-indigo dark:text-parchment">{service.startingPrice}</div>
            <Link href={`/project?service=${slug === 'fast-web' ? 'fast' : slug === 'pro-web' ? 'pro' : 'web'}${slug === 'seo' ? '&features=seo' : slug === 'custom-theme' ? '&features=sections' : slug === 'rescue' || slug === 'support' ? '&features=support' : ''}`} className="bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-base font-medium px-6 py-2.5 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150">ثبت پروژه</Link>
          </div>

          {(slug === 'fast-web' || slug === 'pro-web') && (
            <div className="mb-12 relative px-1">
              <button onClick={() => scrollGallery('right')} aria-label="اسلاید قبلی" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-space-indigo/80 backdrop-blur-sm border border-dusty-grape/20 dark:border-almond-silk/20 text-dusty-grape dark:text-almond-silk hover:bg-dusty-grape hover:text-parchment dark:hover:bg-almond-silk dark:hover:text-space-indigo transition-all duration-200 cursor-pointer md:-right-3">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollGallery('left')} aria-label="اسلاید بعدی" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-space-indigo/80 backdrop-blur-sm border border-dusty-grape/20 dark:border-almond-silk/20 text-dusty-grape dark:text-almond-silk hover:bg-dusty-grape hover:text-parchment dark:hover:bg-almond-silk dark:hover:text-space-indigo transition-all duration-200 cursor-pointer md:-left-3">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="rounded-2xl overflow-hidden">
                <div ref={galleryRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory snap-center scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {[
                  { icon: ShoppingBag, title: 'فروشگاهی', desc: 'فروشگاه آنلاین مدرن با تجربه خرید روان.' },
                  { icon: HeartPulse, title: 'کلینیک', desc: 'سایت کلینیک پزشکی با نوبت‌دهی آنلاین.' },
                  { icon: Rocket, title: 'استارتاپ', desc: 'لندینگ پیج استارتاپ با تمرکز بر تبدیل.' },
                  { icon: Store, title: 'خدماتی', desc: 'سایت شرکت خدماتی با فرم درخواست آنلاین.' },
                  { icon: GraduationCap, title: 'آموزشی', desc: 'پلتفرم آموزش آنلاین با سیستم دوره.' },
                  { icon: Building2, title: 'شرکتی', desc: 'سایت شرکتی مدرن با معرفی خدمات.' },
                ].map((p, i) => (
                  <div key={i} className={`shrink-0 w-[75%] sm:w-[80%] snap-center rounded-2xl overflow-hidden bg-gradient-to-br from-dusty-grape/20 to-almond-silk/20 dark:from-dusty-grape/30 dark:to-space-indigo aspect-[16/9] flex flex-col items-center justify-center gap-2 border border-dusty-grape/20 dark:border-dusty-grape/30 transition-transform duration-300 ${activeSlide === i ? 'scale-[0.95]' : 'scale-100'}`}>
                    <p.icon className="w-10 h-10 sm:w-12 sm:h-12 text-dusty-grape/40 dark:text-almond-silk/40" />
                    <div className="text-center px-2">
                      <h4 className="font-semibold text-xs sm:text-sm">{p.title}</h4>
                      <p className="text-[10px] sm:text-xs text-dusty-grape/80 dark:text-almond-silk/70">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {Array.from({ length: galleryItems }).map((_, i) => (
                  <button key={i} onClick={() => scrollToSlide(i)} aria-label={`رفتن به اسلاید ${i + 1}`} aria-current={activeSlide === i || undefined} className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${activeSlide === i ? 'bg-dusty-grape dark:bg-almond-silk w-6' : 'bg-dusty-grape/30 dark:bg-almond-silk/30 w-2'}`} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-12">

            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Users className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">این سرویس مناسب چه کسانی است؟</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.suitedFor.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-dusty-grape dark:text-almond-silk/80 text-right">
                    <span className="w-2 h-2 rounded-full bg-dusty-grape dark:bg-almond-silk shrink-0"></span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Star className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">مزایا و امکانات</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-dusty-grape dark:text-almond-silk/80 text-right leading-relaxed">
                    <Check className="w-4 h-4 text-dusty-grape dark:text-almond-silk shrink-0 mt-0.5" />
                    {b}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 text-right">
                <Layers className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">فرآیند پروژه</h2>
              </div>
              <div className="relative space-y-6">
                <div className="absolute right-[15px] top-4 bottom-4 w-px bg-dusty-grape/20 dark:bg-almond-silk/20"></div>
                {service.process.map((p, i) => (
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

            <section className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 text-right">
                <HelpCircle className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                <h2 className="text-xl font-semibold">سوالات متداول</h2>
              </div>
              <div className="space-y-3">
                {service.faq.map((item, i) => (
                  <div key={i}>
                    <div className={`bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-white/20 dark:border-dusty-grape/30 rounded-xl overflow-hidden ${openFaq === i ? 'open' : ''}`}>
                      <button
                        type="button"
                        aria-expanded={openFaq === i}
                        aria-controls={`service-faq-answer-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-right cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dusty-grape dark:focus-visible:ring-almond-silk"
                      >
                        <span className="text-sm font-medium">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-dusty-grape dark:text-almond-silk shrink-0 transition-transform duration-250 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <div id={`service-faq-answer-${i}`} role="region" className={`faq-answer ${openFaq === i ? 'open' : 'closed'} px-5 pb-5`}>
                        <p className="text-sm text-dusty-grape dark:text-almond-silk/80 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Link href={service.recommendation.link} className="block text-center py-8 text-dusty-grape dark:text-almond-silk text-base leading-relaxed opacity-70 hover:opacity-100 transition-opacity duration-200">
                {service.recommendation.text} <span className="text-space-indigo dark:text-parchment font-semibold">{service.recommendation.linkText}</span>
            </Link>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
