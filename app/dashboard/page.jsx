'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, RefreshCw } from 'lucide-react'

const planLabels = {
  fast: 'Fast Web',
  pro: 'Pro Web',
  web: 'خدمات وب',
}

const featureLabels = {
  seo: 'سئو',
  sections: 'بخش‌های سفارشی',
  pages: 'صفحات اضافه',
  blog: 'وبلاگ',
  support: 'پشتیبانی',
  animation: 'انیمیشن',
  admin: 'پنل مدیریت',
  multilang: 'چند زبانه',
  custom: 'سیستم سفارشی',
}

export default function DashboardPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchProjects = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      if (res.ok) {
        setProjects(data.projects)
      } else {
        setError(data.error || 'خطا در دریافت اطلاعات')
      }
    } catch {
      setError('خطا در اتصال به سرور')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/dashboard/auth', { method: 'DELETE' })
    router.push('/dashboard/login')
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">درخواست‌های پروژه</h1>
            <p className="text-sm text-dusty-grape dark:text-almond-silk mt-1">{projects.length} درخواست ثبت شده</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchProjects}
              disabled={loading}
              className="p-2 rounded-lg border border-dusty-grape/20 dark:border-almond-silk/20 hover:bg-dusty-grape/5 dark:hover:bg-almond-silk/5 transition-colors cursor-pointer disabled:opacity-40"
              title="بروزرسانی"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-dusty-grape dark:text-almond-silk">در حال بارگذاری...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-dusty-grape dark:text-almond-silk">هنوز درخواستی ثبت نشده</div>
        ) : (
          <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm" dir="rtl">
                <thead>
                  <tr className="border-b border-dusty-grape/10 dark:border-dusty-grape/20">
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk">#</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk">نوع پروژه</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk">امکانات</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk">شماره تماس</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk">توضیحات</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk">تاریخ</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={p.id} className="border-b border-dusty-grape/5 dark:border-dusty-grape/10 last:border-0 hover:bg-dusty-grape/3 dark:hover:bg-almond-silk/3">
                      <td className="px-4 py-3 text-dusty-grape/60 dark:text-almond-silk/60">{projects.length - i}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-space-indigo/5 dark:bg-parchment/5">
                          {planLabels[p.plan] || p.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(p.features || []).map((f) => (
                            <span key={f} className="inline-block px-2 py-0.5 rounded text-[11px] bg-almond-silk/15 dark:bg-dusty-grape/15">
                              {featureLabels[f] || f}
                            </span>
                          ))}
                          {(!p.features || p.features.length === 0) && (
                            <span className="text-dusty-grape/40 dark:text-almond-silk/40">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3" dir="ltr">{p.phone}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate" title={p.description}>
                        {p.description || <span className="text-dusty-grape/40 dark:text-almond-silk/40">-</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-dusty-grape/60 dark:text-almond-silk/60 whitespace-nowrap">{formatDate(p.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-dusty-grape/5 dark:divide-dusty-grape/10">
              {projects.map((p, i) => (
                <div key={p.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dusty-grape/60 dark:text-almond-silk/60">#{projects.length - i}</span>
                    <span className="text-xs text-dusty-grape/60 dark:text-almond-silk/60">{formatDate(p.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-space-indigo/5 dark:bg-parchment/5">
                      {planLabels[p.plan] || p.plan}
                    </span>
                    <span className="text-sm" dir="ltr">{p.phone}</span>
                  </div>
                  {p.features && p.features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {p.features.map((f) => (
                        <span key={f} className="inline-block px-2 py-0.5 rounded text-[11px] bg-almond-silk/15 dark:bg-dusty-grape/15">
                          {featureLabels[f] || f}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.description && (
                    <p className="text-xs text-dusty-grape/70 dark:text-almond-silk/70">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
