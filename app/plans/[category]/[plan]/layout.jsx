import categories from '@/data/plans'

export async function generateStaticParams() {
  const params = []
  for (const cat of categories) {
    for (const plan of cat.plans) {
      params.push({ category: cat.id, plan: plan.id })
    }
  }
  return params
}

export async function generateMetadata({ params }) {
  const { category, plan } = await params
  const cat = categories.find(c => c.id === category)
  if (!cat) return {}
  const planData = cat.plans.find(p => p.id === plan)
  if (!planData) return {}

  const seoTitles = {
    froshgahi: {
      eghtesadi: {
        title: 'سایت فروشگاهی اقتصادی — طراحی فروشگاه اینترنتی با قالب | oven',
        description: 'سایت فروشگاهی اقتصادی با قیمت ۲۵ میلیون تومان. فروشگاه اینترنتی با قالب حرفه‌ای وردپرس، درگاه پرداخت، دامنه .ir رایگان و گواهی SSL.',
        keywords: 'سایت فروشگاهی اقتصادی, فروشگاه اینترنتی اقتصادی, طراحی فروشگاه ارزان',
      },
      herfei: {
        title: 'سایت فروشگاهی حرفه‌ای — طراحی فروشگاه اینترنتی اختصاصی | oven',
        description: 'سایت فروشگاهی حرفه‌ای با قیمت ۸۵ میلیون تومان. فروشگاه اینترنتی با قالب اختصاصی، امکانات پیشرفته فروشگاهی و دامنه .ir رایگان.',
        keywords: 'سایت فروشگاهی حرفه‌ای, فروشگاه اینترنتی اختصاصی, طراحی فروشگاه پیشرفته',
      },
      ekhtesasi: {
        title: 'سایت فروشگاهی اختصاصی — فروشگاه اینترنتی کدنویسی‌شده | oven',
        description: 'سایت فروشگاهی اختصاصی با قیمت ۱۱۵ میلیون تومان. فروشگاه اینترنتی با کدنویسی سفارشی، معماری مقیاس‌پذیر و حداکثر عملکرد.',
        keywords: 'سایت فروشگاهی اختصاصی, فروشگاه اینترنتی اختصاصی, طراحی فروشگاه کدنویسی شده',
      },
    },
    sherkati: {
      eghtesadi: {
        title: 'سایت شرکتی اقتصادی — طراحی سایت شرکتی با قالب | oven',
        description: 'سایت شرکتی اقتصادی با قیمت ۲۵ میلیون تومان. سایت شرکتی با قالب حرفه‌ای وردپرس، دامنه .ir رایگان و گواهی SSL.',
        keywords: 'سایت شرکتی اقتصادی, طراحی سایت شرکتی, سایت شرکتی ارزان',
      },
      herfei: {
        title: 'سایت شرکتی حرفه‌ای — طراحی سایت سازمانی اختصاصی | oven',
        description: 'سایت شرکتی حرفه‌ای با قیمت ۸۵ میلیون تومان. سایت شرکتی با طراحی اختصاصی UI/UX، امکانات پیشرفته و دامنه .ir رایگان.',
        keywords: 'سایت شرکتی حرفه‌ای, طراحی سایت سازمانی, سایت شرکتی اختصاصی',
      },
      ekhtesasi: {
        title: 'سایت شرکتی اختصاصی — پورتال سازمانی کدنویسی‌شده | oven',
        description: 'سایت شرکتی اختصاصی با قیمت ۱۱۵ میلیون تومان. پورتال سازمانی با کدنویسی سفارشی، معماری مقیاس‌پذیر و امنیت سطح سازمانی.',
        keywords: 'سایت شرکتی اختصاصی, پورتال سازمانی, طراحی سایت شرکتی اختصاصی',
      },
    },
  }

  const seo = seoTitles?.[category]?.[plan] || {
    title: `${planData.title} ${cat.title} | oven`,
    description: planData.shortDesc,
  }

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords || '',
    alternates: {
      canonical: `https://ovenweb.vercel.app/plans/${category}/${plan}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://ovenweb.vercel.app/plans/${category}/${plan}`,
      type: 'website',
      siteName: 'Oven',
      locale: 'fa_IR',
      images: [
        {
          url: 'https://ovenweb.vercel.app/og-telegram.webp',
          width: 1200,
          height: 630,
          alt: `${seo.title} | Oven`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['https://ovenweb.vercel.app/og-telegram.webp'],
    },
  }
}

export default function PlanDetailLayout({ children }) {
  return children
}
