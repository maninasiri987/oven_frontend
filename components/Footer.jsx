import { Send } from 'lucide-react'
import { FadeIn } from './Motion'

export default function Footer() {
  return (
    <footer className="bg-space-indigo text-parchment md:snap-end" dir="rtl">
      <FadeIn>
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12 text-right">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="flex flex-col gap-5">
              <h3 className="text-base font-semibold">ارتباط با ما</h3>
              <a href="tel:09105362403" className="text-lilac-ash text-sm hover:text-parchment transition-colors duration-200" dir="ltr">09105362403</a>
              <a href="mailto:maninasiri987@gmail.com" className="text-lilac-ash text-sm hover:text-parchment transition-colors duration-200">maninasiri987@gmail.com</a>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-base font-semibold">ما را دنبال کنید</h3>
              <div className="flex items-center justify-start gap-3">
                <a href="https://instagram.com/ovenweb" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام اوون وب" className="social-ig w-10 h-10 flex items-center justify-center rounded-full bg-dusty-grape/40 transition-all duration-200 cursor-pointer">
                  <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://t.me/ovenweb" target="_blank" rel="noopener noreferrer" aria-label="تلگرام اوون وب" className="social-tg w-10 h-10 flex items-center justify-center rounded-full bg-dusty-grape/40 transition-all duration-200 cursor-pointer">
                  <Send className="w-4 h-4 relative z-10" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-dusty-grape/20">
            <h3 className="text-base font-semibold mb-3">طراحی سایت با oven</h3>
            <p className="text-lilac-ash text-sm leading-relaxed max-w-lg">در oven تلاش می‌کنیم وب‌سایت‌هایی طراحی کنیم که ساده، سریع و مناسب رشد کسب‌وکارها باشند. تمرکز ما روی ساخت تجربه‌ای تمیز، حرفه‌ای و قابل توسعه است.</p>
          </div>
        </div>
        <div className="border-t border-dusty-grape/20 mt-4">
          <div className="w-full px-6 py-6">
            <p className="text-lilac-ash text-xs text-center">© ۲۰۲۶ oven</p>
          </div>
        </div>
      </FadeIn>
    </footer>
  )
}
