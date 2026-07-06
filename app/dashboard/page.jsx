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

const statusOptions = ['بررسی نشده', 'رد شده', 'تایید شده']

const statusStyles = {
  'بررسی نشده': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'رد شده': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'تایید شده': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

export default function DashboardPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
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

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
      }
    } catch {
      setError('خطا در بروزرسانی وضعیت')
    } finally {
      setUpdatingId(null)
    }
  }

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
    <main className="min-h-screen p-6 sm:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">#</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">نوع پروژه</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">امکانات</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">شماره تماس</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">توضیحات</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">وضعیت</th>
                    <th className="text-right px-4 py-3 font-medium text-dusty-grape dark:text-almond-silk whitespace-nowrap">تاریخ</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={p.id} className="border-b border-dusty-grape/5 dark:border-dusty-grape/10 last:border-0 hover:bg-dusty-grape/3 dark:hover:bg-almond-silk/3 align-top">
                      <td className="px-4 py-3 text-dusty-grape/60 dark:text-almond-silk/60 whitespace-nowrap">{projects.length - i}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-space-indigo/5 dark:bg-parchment/5">
                          {planLabels[p.plan] || p.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(p.features || []).map((f) => (
                            <span key={f} className="inline-block px-2 py-0.5 rounded text-[11px] bg-almond-silk/15 dark:bg-dusty-grape/15 whitespace-nowrap">
                              {featureLabels[f] || f}
                            </span>
                          ))}
                          {(!p.features || p.features.length === 0) && (
                            <span className="text-dusty-grape/40 dark:text-almond-silk/40">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" dir="ltr" style={{ textAlign: 'right' }}>{p.phone}</td>
                      <td className="px-4 py-3 min-w-[180px] max-w-[280px] break-words">{p.description || <span className="text-dusty-grape/40 dark:text-almond-silk/40">-</span>}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={p.status || 'بررسی نشده'}
                          onChange={(e) => handleStatusChange(p.id, e.target.value)}
                          disabled={updatingId === p.id}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-space-indigo/20 dark:focus:ring-parchment/20 ${statusStyles[p.status || 'بررسی نشده']} disabled:opacity-50`}
                        >
                          {statusOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-space-indigo/5 dark:bg-parchment/5">
                      {planLabels[p.plan] || p.plan}
                    </span>
                    <span className="text-sm" dir="ltr" style={{ textAlign: 'right' }}>{p.phone}</span>
                    <select
                      value={p.status || 'بررسی نشده'}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      disabled={updatingId === p.id}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${statusStyles[p.status || 'بررسی نشده']} disabled:opacity-50`}
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
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
                    <p className="text-xs text-dusty-grape/70 dark:text-almond-silk/70 break-words">{p.description}</p>
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
