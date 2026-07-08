import { Eye, CalendarCheck, Headphones, Sparkles, Award, TrendingUp } from 'lucide-react'
import { MotionSection, StaggerGroup, StaggerItem } from './Motion'


const items = [
  { icon: Eye, title: 'شفافیت', desc: 'بدون ابهام، همه چیز مشخصه.' },
  { icon: CalendarCheck, title: 'تحویل مشخص', desc: 'زمان تحویل از ابتدا مشخصه.' },
  { icon: Headphones, title: 'پشتیبانی', desc: 'بعد از تحویل تنها نیستید.' },
  { icon: Sparkles, title: 'سادگی', desc: 'پیچیدگی نداره، ساده و شفاف.' },
  { icon: Award, title: 'کیفیت اجرا', desc: 'تمرکز روی جزئیات و کیفیت.' },
  { icon: TrendingUp, title: 'قابل توسعه', desc: 'سایتی که با شما رشد می‌کنه.' },
]

export default function WhyOven() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 md:min-h-screen w-full flex flex-col justify-center md:snap-center bg-almond-silk/20 dark:bg-dusty-grape/10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12 text-right">چرا Oven؟</h2>
        </MotionSection>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-dusty-grape/20 dark:border-dusty-grape/30 rounded-2xl p-5 sm:p-6 text-right shadow-md shadow-dusty-grape/10 dark:shadow-space-indigo/20 hover:shadow-lg hover:shadow-dusty-grape/20 dark:hover:shadow-parchment/10 hover:border-dusty-grape/40 dark:hover:border-dusty-grape/50 transition-all duration-300">
                <div className="flex sm:block items-start gap-4">
                  <div className="w-12 h-12 sm:w-10 sm:h-10 shrink-0 rounded-full bg-dusty-grape/10 dark:bg-almond-silk/10 flex items-center justify-center mb-0 sm:mb-4">
                    <item.icon className="w-6 h-6 sm:w-5 sm:h-5 text-dusty-grape dark:text-almond-silk" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-sm text-dusty-grape dark:text-almond-silk/80">{item.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
