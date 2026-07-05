'use client'
import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: options.amount || 0.15, rootMargin: options.rootMargin || '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.amount, options.rootMargin])

  return [ref, isInView]
}
