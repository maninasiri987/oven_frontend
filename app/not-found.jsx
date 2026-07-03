import Link from 'next/link'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
    <main className="pt-24 pb-20 px-6 sm:px-10 min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl sm:text-8xl font-bold text-dusty-grape/20 dark:text-almond-silk/20 mb-6">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">این صفحه پیدا نشد.</h2>
          <p className="text-dusty-grape dark:text-almond-silk mb-8 leading-relaxed">
            شاید مسیر اشتباه اومدی؛<br />ولی می‌تونیم از اول شروع کنیم.
          </p>
          <Link href="/" className="inline-block bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo text-sm font-medium px-8 py-3 rounded-lg hover:bg-dusty-grape dark:hover:bg-almond-silk transition-colors duration-150">بازگشت</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
