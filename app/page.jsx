'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import QuickSelection from '@/components/QuickSelection'

const ProcessTimeline = dynamic(() => import('@/components/ProcessTimeline'), {
  loading: () => <div className="md:h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="md:h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

const Estimate = dynamic(() => import('@/components/Estimate'), {
  loading: () => <div className="md:h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

const WhyOven = dynamic(() => import('@/components/WhyOven'), {
  loading: () => <div className="md:h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => <div className="md:h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="md:h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-space-indigo dark:border-parchment border-t-transparent rounded-full animate-spin" /></div>,
})

export default function Home() {
  useEffect(() => {
    function getContainer() {
      return document.querySelector('[data-scroll-container]')
    }
    function onKey(e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const c = getContainer()
      if (!c) return
      e.preventDefault()
      const sectionH = c.clientHeight
      const dir = e.key === 'ArrowDown' ? 1 : -1
      const next = Math.round(c.scrollTop / sectionH + dir) * sectionH
      c.scrollTo({ top: Math.max(0, Math.min(next, c.scrollHeight - c.clientHeight)), behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div data-scroll-container className="transition-all duration-300 ease-in-out md:snap-y md:snap-mandatory md:overflow-y-auto md:h-screen">
      <Hero />
      <QuickSelection />
      <ProcessTimeline />
      <Services />
      <Estimate />
      <WhyOven />
      <Portfolio />
      <FAQ />
      <Footer />
    </div>
  )
}
