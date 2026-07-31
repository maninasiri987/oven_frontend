'use client'
import { useState, useLayoutEffect } from 'react'

export default function useTheme(serverTheme) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return serverTheme === 'dark'
    if (document.documentElement.classList.contains('dark')) return true
    return serverTheme === 'dark'
  })
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const stored = localStorage.getItem('oven-theme')
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefers
    document.documentElement.classList.toggle('dark', dark)
    if (!stored) {
      localStorage.setItem('oven-theme', dark ? 'dark' : 'light')
    }
    document.cookie = `oven-theme=${dark ? 'dark' : 'light'}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    // Defer state updates out of the effect body (async) to avoid cascading
    // renders from synchronous setState inside an effect.
    const raf = requestAnimationFrame(() => {
      setIsDark(dark)
      setMounted(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('oven-theme', next ? 'dark' : 'light')
      document.cookie = `oven-theme=${next ? 'dark' : 'light'}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      return next
    })
  }

  return { isDark, toggleTheme, mounted }
}
