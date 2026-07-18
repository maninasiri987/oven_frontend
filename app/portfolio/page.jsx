import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: { absolute: 'نمونه‌کارهای اوون وب — طراحی سایت و پروژه‌ها | oven' },
  description: 'پروژه‌های واقعی اوون وب: فروشگاه اینترنتی، سیستم جستجوی هوشمند و اپلیکیشن مدیریت — نمونه‌سایت‌هایی سریع، مدرن و بهینه.',
  alternates: { canonical: 'https://ovenweb.vercel.app/portfolio' },
}

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64" />,
})

const projects = [
  {
    title: 'پوشاک آرا',
    desc: 'فروشگاه آنلاین پوشاک با طراحی مدرن و تجربه خرید روان.',
    type: 'Fast Web',
    image: '/portfolio/cloth-store.png',
    link: 'https://maninasiri987.github.io/cloth_website/',
    delay: '0',
  },
  {
    title: 'بلاگی',
    desc: 'سیستم بلاگ حرفه‌ای با قابلیت جستجوی هوشمند مقالات.',
    type: 'Fast Web',
    image: '/portfolio/blog-system.png',
    link: 'https://maninasiri987.github.io/blog_system/',
    delay: '80',
  },
  {
    title: 'GrowthBox',
    desc: 'اپلیکیشن مدیریت کارها و یادداشت‌ها با داشبورد تعاملی.',
    type: 'Pro Web',
    image: '/portfolio/growthbox.png',
    link: 'https://groowth-box.vercel.app/dashboard',
    delay: '160',
  },
]

export default function PortfolioPage() {
  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto" dir="rtl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 reveal">نمونه کار</h1>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-16 reveal" data-delay="50">پروژه‌های واقعی Oven</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Link
                key={p.title}
                href={p.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl overflow-hidden reveal shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300"
                data-delay={p.delay}
              >
                <div className="relative h-48 bg-gradient-to-br from-dusty-grape/20 to-almond-silk/20 dark:from-dusty-grape/30 dark:to-space-indigo overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 text-right">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    <span className="text-xs bg-dusty-grape/10 dark:bg-almond-silk/10 text-dusty-grape dark:text-almond-silk px-2 py-0.5 rounded-full">{p.type}</span>
                  </div>
                  <p className="text-sm text-dusty-grape dark:text-almond-silk/80">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
