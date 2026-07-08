'use client'
import { useEffect, useState, useRef } from 'react'
import { Zap, Star, Check, Box, CircleCheck, Grid3X3, ArrowUpRight } from 'lucide-react'

const words = [
  { text: 'سریع\u200Cتر', icon: Zap },
  { text: 'حرفه\u200Cای\u200Cتر', icon: Star },
  { text: 'ساده\u200Cتر', icon: Check },
  { text: 'قابل توسعه\u200Cتر', icon: Box },
  { text: 'روان\u200Cتر', icon: CircleCheck },
  { text: 'مدیریت\u200Cپذیرتر', icon: Grid3X3 },
  { text: 'آماده رشد', icon: ArrowUpRight },
]

function SlotWords({ height, fontSize, iconSize }) {
  const [idx, setIdx] = useState(0)
  const n = words.length
  const ref = useRef(null)

  useEffect(() => {
    const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefers) return
    let id = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!id) id = setInterval(() => setIdx(prev => (prev + 1) % n), 2200)
        } else {
          if (id) { clearInterval(id); id = null }
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => { observer.disconnect(); if (id) clearInterval(id) }
  }, [n])

  const visible = words
    .map((w, i) => {
      const off = ((i - idx) % n + n) % n
      const abs = off > n / 2 ? off - n : off
      return { ...w, i, abs }
    })
    .filter(({ abs }) => Math.abs(abs) <= 2)

  return (
    <div ref={ref} className="relative w-full h-full">
      {visible.map(({ i, text, icon: Icon, abs }) => {
        const absVal = Math.abs(abs)
        return (
          <div key={i} className="absolute w-full flex items-center justify-center gap-1.5" style={{
            height, fontSize, fontWeight: 600, top: 0, left: 0,
            transform: `translateY(${abs * height}px)`,
            opacity: absVal === 0 ? 1 : absVal === 1 ? 0.5 : 0,
            filter: absVal === 0 ? 'blur(0)' : absVal === 1 ? 'blur(1.5px)' : 'blur(4px)',
            transition: 'transform 700ms cubic-bezier(.23,1,.32,1), opacity 700ms cubic-bezier(.23,1,.32,1), filter 700ms cubic-bezier(.23,1,.32,1)',
          }}>
            <span>{text}</span>
            <Icon size={iconSize} />
          </div>
        )
      })}
    </div>
  )
}

export default function SlotBox() {
  return (
    <>
      <div className="hidden md:flex items-center justify-center reveal" data-delay="150">
        <div className="relative h-80 w-full max-w-sm flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-dusty-grape/5 to-transparent dark:from-parchment/5 rounded-3xl"></div>
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 mb-6 text-right" dir="rtl">
              <span className="text-xl sm:text-2xl text-dusty-grape dark:text-almond-silk/60 tracking-wide whitespace-nowrap">چرا Oven؟</span>
              <span className="text-xl sm:text-2xl font-semibold text-space-indigo dark:text-parchment whitespace-nowrap">چون:</span>
            </div>
            <div className="mx-auto overflow-hidden border-y border-dusty-grape/20 dark:border-almond-silk/20" style={{ width: 220, height: 60 }}>
              <div className="relative w-full h-full">
                <SlotWords height={60} fontSize={28} iconSize={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden py-8 text-center reveal" data-delay="150">
        <div className="relative mx-auto max-w-xs flex items-center justify-center pt-8 pb-4">
          <div className="absolute inset-0 bg-gradient-to-b from-dusty-grape/5 to-transparent dark:from-parchment/5 rounded-3xl"></div>
          <div className="relative">
            <div className="flex items-center justify-center gap-1.5 mb-3 text-right" dir="rtl">
              <span className="text-xl text-dusty-grape dark:text-almond-silk/60 whitespace-nowrap">چرا Oven؟</span>
              <span className="text-xl font-semibold text-space-indigo dark:text-parchment whitespace-nowrap">چون:</span>
            </div>
            <div className="mx-auto overflow-hidden border-y border-dusty-grape/20 dark:border-almond-silk/20" style={{ width: 220, height: 56 }}>
              <div className="relative w-full h-full">
                <SlotWords height={56} fontSize={24} iconSize={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
