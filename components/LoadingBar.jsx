'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingBar() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [prevPath, setPrevPath] = useState(pathname)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(false)
      setPrevPath(pathname)
    }
  }, [pathname, prevPath])

  useEffect(() => {
    let timer
    let started = false

    const handleClick = (e) => {
      const link = e.target.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('http')) return
      if (href === window.location.pathname) return

      started = false
      timer = setTimeout(() => {
        started = true
        setLoading(true)
      }, 300)
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      clearTimeout(timer)
      if (started) setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment/80 dark:bg-space-indigo/80 backdrop-blur-sm">
      <div className="loading-spinner" />
    </div>
  )
}
