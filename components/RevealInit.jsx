'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Activates `.reveal` elements (used by static pages like about/plans/portfolio):
// applies their `data-delay` and adds `.reveal-visible` so they animate in on page enter.
export default function RevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.reveal-visible)')
    els.forEach((el) => {
      const delay = parseInt(el.dataset.delay || '0', 10)
      if (delay) el.style.transitionDelay = `${delay}ms`
      // Double rAF so the initial state is painted before transitioning in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('reveal-visible'))
      })
    })
  }, [pathname])

  return null
}
