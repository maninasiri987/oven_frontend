'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function DashboardLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/dashboard/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        const from = searchParams.get('from') || '/dashboard'
        router.push(from)
      } else {
        setError(data.error || 'رمز عبور اشتباه است')
      }
    } catch {
      setError('خطا در اتصال به سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-space-indigo/5 dark:bg-parchment/5 flex items-center justify-center">
            <Lock className="w-7 h-7 text-dusty-grape dark:text-almond-silk" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">داشبورد</h1>
          <p className="text-sm text-dusty-grape dark:text-almond-silk">برای مشاهده درخواست‌ها رمز عبور را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8">
          <div className="mb-6">
            <input
              type="password"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full p-4 rounded-xl border border-dusty-grape/20 dark:border-almond-silk/20 bg-transparent text-sm text-center tracking-wider focus:outline-none focus:border-space-indigo dark:focus:border-parchment transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={!password || loading}
            className="w-full bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-6 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'در حال بررسی...' : 'ورود'}
          </button>
        </form>
      </div>
    </main>
  )
}
