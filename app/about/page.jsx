import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Target, Heart, Lightbulb } from 'lucide-react'

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64" />,
})

const beliefs = [
  { icon: Target, title: 'تمرکز بر رشد', desc: 'هر وب‌سایتی که می‌سازیم باید به رشد کسب‌وکار شما کمک کنه. طراحی زیبا مهمه، ولی نتیجه مهم‌تره.' },
  { icon: Heart, title: 'سادگی', desc: 'ما باور داریم بهترین وب‌سایت‌ها ساده‌ترین‌ها هستند. بدون پیچیدگی اضافی، بدون شلوغی.' },
  { icon: Lightbulb, title: 'تفکر بلندمدت', desc: 'سایت‌هایی می‌سازیم که قابل توسعه باشند. امروز شروع می‌کنیم، فردا رشد می‌دیم.' },
]

export default function About() {
  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto" dir="rtl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">درباره Oven</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-16 reveal" data-delay="50">چرا وجود داریم و به چی باور داریم</p>

          <div className="space-y-12">
            <div className="text-right reveal">
              <h2 className="text-xl font-semibold mb-4">داستان Oven</h2>
              <p className="text-dusty-grape dark:text-almond-silk/80 leading-relaxed mb-4">
                Oven از یک باور ساده شروع شد: وب‌سایت‌ها نباید پیچیده، گران یا غیرقابل فهم باشند.
                ما می‌خواهیم هر کسب‌وکاری، صرف نظر از اندازه‌اش، به یک وب‌سایت حرفه‌ای و مؤثر دسترسی داشته باشد.
              </p>
              <p className="text-dusty-grape dark:text-almond-silk/80 leading-relaxed">
                تمرکز ما روی ساخت تجربه‌ای تمیز، حرفه‌ای و قابل توسعه است. وب‌سایت‌هایی که ساده باشند، سریع باشند،
                و مناسب رشد کسب‌وکارها.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beliefs.map((b) => (
                <div key={b.title} className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-white/20 dark:border-dusty-grape/30 rounded-2xl p-6 text-right reveal">
                  <div className="w-10 h-10 mb-4 rounded-full bg-dusty-grape/10 dark:bg-almond-silk/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                  </div>
                  <h3 className="font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-dusty-grape/70 dark:text-almond-silk/60 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-almond-silk/30 dark:bg-dusty-grape/10 rounded-2xl p-10 reveal">
              <h2 className="text-2xl font-semibold mb-4">آماده‌اید؟</h2>
              <p className="text-dusty-grape dark:text-almond-silk mb-6">بیایید با هم وب‌سایت بعدی کسب‌وکارتان را بسازیم.</p>
              <Link href="/project" className="inline-block bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-8 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150">شروع پروژه</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
