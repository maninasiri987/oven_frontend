import { ClipboardCheck, Search, Palette, HeadphonesIcon } from 'lucide-react'
import { MotionSection } from './Motion'

const steps = [
  { icon: ClipboardCheck, num: '۱', title: 'ثبت پروژه', desc: 'اطلاعات پروژه خود را ارسال کنید' },
  { icon: Search, num: '۲', title: 'بررسی نیاز', desc: 'نیازهای شما را تحلیل می‌کنیم' },
  { icon: Palette, num: '۳', title: 'طراحی و اجرا', desc: 'سایت شما را می‌سازیم' },
  { icon: HeadphonesIcon, num: '۴', title: 'تحویل و پشتیبانی', desc: 'سایت تحویل و پشتیبانی می‌شود' },
]

export default function ProcessTimeline() {
  return (
    <section className="py-12 px-4 sm:px-10 md:min-h-screen w-full flex flex-col justify-center md:snap-center" dir="rtl">
      <div className="max-w-5xl mx-auto w-full">
        <MotionSection className="text-center mb-6 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">فرآیند کار</h2>
          <p className="text-dusty-grape dark:text-almond-silk text-sm">از ثبت پروژه تا تحویل نهایی</p>
        </MotionSection>

        <div className="hidden md:block relative">
          <div className="absolute top-10 left-0 right-0 h-px bg-dusty-grape/15 dark:bg-almond-silk/15"></div>

          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="relative z-10 w-20 h-20 mx-auto mb-5 rounded-full bg-white/80 dark:bg-space-indigo/80 border border-dusty-grape/15 dark:border-dusty-grape/20 flex items-center justify-center shadow-lg shadow-dusty-grape/8 dark:shadow-space-indigo/20">
                  <step.icon className="w-7 h-7 text-dusty-grape dark:text-almond-silk" />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-dusty-grape dark:bg-almond-silk flex items-center justify-center shadow-sm">
                    <span className="text-[11px] font-bold text-parchment dark:text-space-indigo">{step.num}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1.5 text-space-indigo dark:text-parchment">{step.title}</h3>
                <p className="text-xs text-dusty-grape dark:text-almond-silk/70 leading-relaxed max-w-[180px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden relative pr-8">
          <div className="absolute top-0 bottom-0 right-4 w-px bg-dusty-grape/15 dark:bg-almond-silk/15"></div>

          <div className="space-y-6 sm:space-y-5">
            {steps.map((step) => (
              <div key={step.num} className="relative flex items-start gap-4">
                <div className="relative z-10 shrink-0 w-9 h-9 rounded-full bg-white/80 dark:bg-space-indigo/80 border border-dusty-grape/15 dark:border-dusty-grape/20 flex items-center justify-center shadow-md shadow-dusty-grape/5 dark:shadow-space-indigo/20">
                  <step.icon className="w-4 h-4 text-dusty-grape dark:text-almond-silk" />
                </div>
                <div className="pt-1.5">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-sm text-space-indigo dark:text-parchment">{step.title}</h3>
                    <span className="w-5 h-5 rounded-full bg-dusty-grape/10 dark:bg-almond-silk/10 flex items-center justify-center text-[10px] font-bold text-dusty-grape dark:text-almond-silk">{step.num}</span>
                  </div>
                  <p className="text-xs text-dusty-grape dark:text-almond-silk/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
