'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { MotionSection, StaggerGroup, StaggerItem } from './Motion'

const faqs = [
  { q: 'چقدر زمان می‌برد؟', a: 'بسته به پلن انتخابی: Fast Web بین ۷ تا ۱۰ روز و Pro Web بین ۱ تا ۲ ماه زمان می‌برد.' },
  { q: 'هزینه‌ها چطور محاسبه می‌شود؟', a: 'هزینه بر اساس پلن پایه و امکانات اضافی محاسبه می‌شود. با استفاده از ابزار برآورد اولیه می‌توانید هزینه تقریبی را ببینید.' },
  { q: 'بعد از تحویل چه می‌شود؟', a: 'مالکیت کامل سایت و فایل‌ها به شما منتقل می‌شود. امکان اضافه کردن پشتیبانی ماهانه هم وجود دارد.' },
  { q: 'پشتیبانی دارید؟', a: 'بله، پشتیبانی ماهانه با هزینه جداگانه قابل اضافه شدن است. شامل بروزرسانی، پشتیبانی فنی و رفع مشکلات می‌شود.' },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-20 px-6 sm:px-10 md:h-screen min-h-screen w-full flex flex-col justify-center md:snap-center bg-almond-silk/20 dark:bg-dusty-grape/10" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <MotionSection>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12 text-right">سوالات متداول</h2>
        </MotionSection>
        <StaggerGroup className="space-y-3">
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className={`bg-white/40 dark:bg-space-indigo/40 backdrop-blur-xl border border-white/20 dark:border-dusty-grape/30 rounded-xl overflow-hidden cursor-pointer ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div className="w-full flex items-center justify-between p-5 text-right">
                  <span className="text-sm font-medium">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-dusty-grape dark:text-almond-silk shrink-0 transition-transform duration-250 ${openIdx === i ? 'rotate-180' : ''}`} />
                </div>
                <div className={`faq-answer ${openIdx === i ? 'open' : 'closed'} px-5 pb-5`}>
                  <p className="text-sm text-dusty-grape dark:text-almond-silk/80 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
