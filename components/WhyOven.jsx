'use client'
import { useRef, useCallback, useState, useEffect } from 'react'
import { Eye, CalendarCheck, Headphones, Sparkles, Award, TrendingUp } from 'lucide-react'
import { MotionSection, StaggerGroup, StaggerItem } from './Motion'
import { useIsMobile } from '@/hooks/useIsMobile'

const items = [
  { icon: Eye, title: 'شفافیت', desc: 'بدون ابهام، همه چیز مشخصه.' },
  { icon: CalendarCheck, title: 'تحویل مشخص', desc: 'زمان تحویل از ابتدا مشخصه.' },
  { icon: Headphones, title: 'پشتیبانی', desc: 'بعد از تحویل تنها نیستید.' },
  { icon: Sparkles, title: 'سادگی', desc: 'پیچیدگی نداره، ساده و شفاف.' },
  { icon: Award, title: 'کیفیت اجرا', desc: 'تمرکز روی جزئیات و کیفیت.' },
  { icon: TrendingUp, title: 'قابل توسعه', desc: 'سایتی که با شما رشد می‌کنه.' },
]

const mobileEntrance = [
  { from: 'rotateY(-35deg) translateX(-40px)', delay: 0 },
  { from: 'rotateY(35deg) translateX(40px)', delay: 80 },
  { from: 'rotateX(35deg) translateY(40px)', delay: 160 },
  { from: 'rotateY(-35deg) translateX(-40px)', delay: 240 },
  { from: 'rotateY(35deg) translateX(40px)', delay: 320 },
  { from: 'rotateX(35deg) translateY(40px)', delay: 400 },
]

function TiltCard({ item, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const iconRef = useRef(null)
  const isMobile = useIsMobile()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setEntered(true), mobileEntrance[index].delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile, index])

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    const glow = glowRef.current
    const icon = iconRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`

    if (glow) {
      glow.style.opacity = '1'
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(198,172,143,0.25), transparent 60%)`
    }

    if (icon) {
      icon.style.transform = `translate(${(x - centerX) / centerX * -6}px, ${(y - centerY) / centerY * -6}px) rotate(${rotateY * 0.5}deg)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glow = glowRef.current
    const icon = iconRef.current
    if (card) card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glow) glow.style.opacity = '0'
    if (icon) icon.style.transform = 'translate(0px, 0px) rotate(0deg)'
  }, [])

  const mobileStyle = isMobile ? {
    transform: entered ? 'perspective(600px) rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) scale(1)' : `perspective(600px) ${mobileEntrance[index].from} scale(0.9)`,
    opacity: entered ? 1 : 0,
    transition: 'transform 0.6s cubic-bezier(.23,1,.32,1), opacity 0.5s ease',
  } : { transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease' }

  return (
    <div
      ref={cardRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className="relative bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-5 sm:p-6 text-right shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20"
      style={mobileStyle}
    >
      {!isMobile && <div ref={glowRef} className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300" />}
      <div className="relative z-10 flex sm:block items-start gap-4">
        <div className="w-12 h-12 sm:w-10 sm:h-10 shrink-0 rounded-full bg-dusty-grape/10 dark:bg-almond-silk/10 flex items-center justify-center mb-0 sm:mb-4">
          <div ref={iconRef} style={!isMobile ? { transition: 'transform 0.15s ease-out' } : undefined}>
            <item.icon className="w-6 h-6 sm:w-5 sm:h-5 text-dusty-grape dark:text-almond-silk" />
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold mb-1 sm:mb-2">{item.title}</h3>
          <p className="text-sm text-dusty-grape dark:text-almond-silk/80">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function WhyOven() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 md:min-h-screen w-full flex flex-col justify-center md:snap-center bg-almond-silk/20 dark:bg-dusty-grape/10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12">چرا Oven؟</h2>
        </MotionSection>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <StaggerItem key={item.title}>
              <TiltCard item={item} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
