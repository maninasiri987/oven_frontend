import { Clock } from 'lucide-react'
import Link from 'next/link'
import { MotionSection, StaggerGroup, StaggerItem } from './Motion'


function WPIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" fill="currentColor">
      <path d="M61.44,0C27.51,0,0,27.51,0,61.44c0,33.93,27.51,61.44,61.44,61.44c33.93,0,61.44-27.51,61.44-61.44C122.88,27.51,95.37,0,61.44,0z M106.37,36.88c0.22,1.63,0.34,3.38,0.34,5.26c0,5.19-0.97,11.03-3.89,18.34l-15.64,45.21c15.22-8.87,25.46-25.37,25.46-44.25C112.64,52.54,110.37,44.17,106.37,36.88z M62.34,65.92l-15.36,44.64c4.59,1.35,9.44,2.09,14.46,2.09c5.96,0,11.68-1.03,17-2.9c-0.14-0.22-0.26-0.45-0.37-0.71L62.34,65.92z M96,58.86c0-6.33-2.27-10.71-4.22-14.12c-2.6-4.22-5.03-7.79-5.03-12.01c0-4.71,3.57-9.09,8.6-9.09c0.23,0,0.44,0.03,0.66,0.04c-9.11-8.35-21.25-13.44-34.57-13.44c-17.89,0-33.62,9.18-42.78,23.08c1.2,0.04,2.33,0.06,3.3,0.06c5.35,0,13.65-0.65,13.65-0.65c2.76-0.16,3.08,3.89,0.33,4.22c0,0-2.77,0.32-5.86,0.49l18.64,55.46l11.21-33.6l-7.98-21.86c-2.76-0.16-5.37-0.49-5.37-0.49c-2.76-0.16-2.44-4.38,0.32-4.22c0,0,8.45,0.65,13.48,0.65c5.35,0,13.65-0.65,13.65-0.65c2.76-0.16,3.08,3.89,0.33,4.22c0,0-2.78,0.32-5.86,0.49L87,92.47l5.28-16.74C94.63,68.42,96,63.24,96,58.86z M10.24,61.44c0,20.27,11.78,37.78,28.86,46.08L14.67,40.6C11.83,46.97,10.24,54.01,10.24,61.44z M61.44,3.69c7.8,0,15.36,1.53,22.48,4.54c3.42,1.45,6.72,3.24,9.81,5.32c3.06,2.07,5.94,4.44,8.55,7.05c2.61,2.61,4.99,5.49,7.05,8.55c2.09,3.09,3.88,6.39,5.32,9.81c3.01,7.12,4.54,14.68,4.54,22.48c0,7.8-1.53,15.36-4.54,22.48c-1.45,3.42-3.24,6.72-5.32,9.81c-2.07,3.06-4.44,5.94-7.05,8.55c-2.61,2.61-5.49,4.99-8.55,7.05c-3.09,2.09-6.39,3.88-9.81,5.32c-7.12,3.01-14.68,4.54-22.48,4.54c-7.8,0-15.36-1.53-22.48-4.54c-3.42-1.45-6.72-3.24-9.81-5.32c-3.06-2.07-5.94-4.44-8.55-7.05c-2.61-2.61-4.99-5.49-7.05-8.55c-2.09-3.09-3.88-6.39-5.32-9.81C5.21,76.8,3.69,69.24,3.69,61.44c0-7.8,1.53-15.36,4.54-22.48c1.45-3.42,3.24-6.72,5.32-9.81c2.07-3.06,4.44-5.94,7.05-8.55c2.61-2.61,5.49-4.99,8.55-7.05c3.09-2.07,6.39-3.88,9.81-5.32C46.08,5.21,53.64,3.69,61.44,3.69z" />
    </svg>
  )
}

function NextIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <mask id="next-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black"/>
      </mask>
      <g mask="url(#next-mask)">
        <circle cx="90" cy="90" r="90" fill="currentColor"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next-grad)"/>
        <rect x="115" y="54" width="12" height="72" fill="url(#next-grad2)"/>
      </g>
      <defs>
        <linearGradient id="next-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="next-grad2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function QuickSelection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 md:h-screen min-h-screen flex flex-col justify-center md:snap-center bg-almond-silk/20 dark:bg-dusty-grape/10" dir="rtl">
      <div className="max-w-2xl mx-auto w-full">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">انتخاب سریع</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-center mb-12">کدوم پلن مناسب کسب‌وکارته؟</p>
        </MotionSection>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StaggerItem className="flex">
            <div className="flex flex-col flex-1 bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 sm:p-8 shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300">
              <div className="mb-6 text-right">
                <div className="flex items-center gap-2 mb-2">
                  <WPIcon className="w-5 h-5 text-dusty-grape dark:text-almond-silk" />
                  <span className="text-sm text-dusty-grape dark:text-almond-silk font-medium">شروع سریع</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Web</h3>
              </div>
              <div className="space-y-3 mb-6 text-right">
                <div className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>۷ تا ۱۰ روز</span>
                </div>
                <div className="text-sm text-dusty-grape dark:text-almond-silk/80">شروع از</div>
                <div className="text-lg font-semibold">۶٬۹۰۰٬۰۰۰ تومان</div>
              </div>
              <div className="bg-dusty-grape/10 dark:bg-parchment/10 rounded-xl p-3 mb-6">
                <span className="text-xs text-dusty-grape dark:text-almond-silk font-medium">۱۵٪ تخفیف شروع همکاری</span>
              </div>
              <div className="mt-auto">
                <Link href="/plans" className="block w-full text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-300">مشاهده</Link>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem className="flex">
            <div className="flex flex-col flex-1 bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-6 sm:p-8 shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300">
              <div className="mb-6 text-right">
                <div className="flex items-center gap-2 mb-2">
                  <NextIcon className="w-4 h-4 text-dusty-grape dark:text-almond-silk" />
                  <span className="text-sm text-dusty-grape dark:text-almond-silk font-medium">ساخت اختصاصی</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Pro Web</h3>
              </div>
              <div className="space-y-3 mb-6 text-right">
                <div className="flex items-center gap-2 text-sm text-dusty-grape dark:text-almond-silk/80">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>۱ تا ۲ ماه</span>
                </div>
                <div className="text-sm text-dusty-grape dark:text-almond-silk/80">شروع از</div>
                <div className="text-lg font-semibold">۲۴٬۹۰۰٬۰۰۰ تومان</div>
              </div>
              <div className="mt-auto">
                <Link href="/plans" className="block w-full text-center border border-dusty-grape dark:border-almond-silk text-dusty-grape dark:text-almond-silk text-sm font-medium py-3 rounded-lg hover:bg-dusty-grape/10 dark:hover:bg-almond-silk/10 transition-all duration-300">مشاهده</Link>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  )
}
