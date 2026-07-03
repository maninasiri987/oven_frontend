'use client'
import Footer from '@/components/Footer'
import Link from 'next/link'

const fastAddons = [
  { key: 'seo', label: 'سئو', price: '+۲٬۴۹۰٬۰۰۰' },
  { key: 'sections', label: 'بخش‌های سفارشی', price: '+۱٬۴۹۰٬۰۰۰' },
  { key: 'pages', label: 'صفحات اضافه', price: '+۵۹۰٬۰۰۰' },
  { key: 'blog', label: 'وبلاگ', price: '+۹۹۰٬۰۰۰' },
  { key: 'support', label: 'پشتیبانی', price: '+۷۹۰٬۰۰۰' },
  { key: 'animation', label: 'انیمیشن', price: '+۱٬۱۹۰٬۰۰۰' },
]

const proAddons = [
  { key: 'admin', label: 'پنل مدیریت', price: '+۳٬۹۰۰٬۰۰۰' },
  { key: 'seo', label: 'سئو حرفه‌ای', price: '+۳٬۹۰۰٬۰۰۰' },
  { key: 'multilang', label: 'چند زبانه', price: '+۲٬۹۰۰٬۰۰۰' },
  { key: 'animation', label: 'انیمیشن', price: '+۲٬۴۹۰٬۰۰۰' },
  { key: 'custom', label: 'سیستم سفارشی', price: '+۶٬۹۰۰٬۰۰۰' },
]

export default function Plans() {
  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto" dir="rtl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">پلن‌های Oven</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-16 reveal" data-delay="50">قیمت‌گذاری شفاف و بدون پنهانکاری</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="0">
              <div className="text-right mb-6">
                <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium bg-dusty-grape/10 dark:bg-parchment/10 px-3 py-1 rounded-full">وردپرسی</span>
                <h3 className="text-2xl font-semibold mt-3 mb-2">Fast Web</h3>
                <p className="text-sm text-dusty-grape dark:text-almond-silk/80">برای شروع سریع کسب‌وکار</p>
              </div>
              <div className="text-right mb-6">
                <div className="text-sm text-dusty-grape dark:text-almond-silk/80">شروع از</div>
                <div className="text-3xl font-semibold">۶٬۹۰۰٬۰۰۰ <span className="text-sm font-normal">تومان</span></div>
              </div>
              <div className="space-y-3 mb-8 text-right">
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>زمان تحویل</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">۷ تا ۱۰ روز</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>تعداد صفحات</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">تا ۵ صفحه</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>ریسپانسیو</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">بله</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>پنل مدیریت</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">وردپرس</span>
                </div>
              </div>
              <Link href="/project" className="block w-full text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150">شروع پروژه</Link>
            </div>

            <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-8 reveal" data-delay="100">
              <div className="text-right mb-6">
                <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium bg-dusty-grape/10 dark:bg-parchment/10 px-3 py-1 rounded-full">اختصاصی</span>
                <h3 className="text-2xl font-semibold mt-3 mb-2">Pro Web</h3>
                <p className="text-sm text-dusty-grape dark:text-almond-silk/80">برای ساخت وب‌سایت اختصاصی</p>
              </div>
              <div className="text-right mb-6">
                <div className="text-sm text-dusty-grape dark:text-almond-silk/80">شروع از</div>
                <div className="text-3xl font-semibold">۲۴٬۹۰۰٬۰۰۰ <span className="text-sm font-normal">تومان</span></div>
              </div>
              <div className="space-y-3 mb-8 text-right">
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>زمان تحویل</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">۱ تا ۲ ماه</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>تعداد صفحات</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">نامحدود</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>ریسپانسیو</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">بله</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dusty-grape dark:text-almond-silk/80">
                  <span>پنل مدیریت</span>
                  <span className="font-medium text-space-indigo dark:text-parchment">اختصاصی</span>
                </div>
              </div>
              <Link href="/project" className="block w-full text-center bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150">شروع پروژه</Link>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-center mb-8 reveal">امکانات اضافی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 reveal">
                <h3 className="font-semibold mb-4 text-right">Fast Web</h3>
                <div className="space-y-3">
                  {fastAddons.map(a => (
                    <div key={a.key} className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-dusty-grape/5 dark:hover:bg-almond-silk/5">
                      <span className="text-dusty-grape dark:text-almond-silk/80">{a.label}</span>
                      <span className="font-medium">{a.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 reveal" data-delay="50">
                <h3 className="font-semibold mb-4 text-right">Pro Web</h3>
                <div className="space-y-3">
                  {proAddons.map(a => (
                    <div key={a.key} className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-dusty-grape/5 dark:hover:bg-almond-silk/5">
                      <span className="text-dusty-grape dark:text-almond-silk/80">{a.label}</span>
                      <span className="font-medium">{a.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
