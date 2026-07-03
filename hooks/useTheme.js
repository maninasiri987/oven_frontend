'use client'
import { useState, useEffect } from 'react'

export default function useTheme() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('oven-theme')
    const dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('oven-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return { isDark, toggleTheme, mounted }
}
