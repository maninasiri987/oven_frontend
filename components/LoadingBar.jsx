'use client'
import { useEffect, useState } from 'react'

export default function LoadingBar() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment dark:bg-space-indigo">
      <div className="loading-spinner" />
    </div>
  )
}
