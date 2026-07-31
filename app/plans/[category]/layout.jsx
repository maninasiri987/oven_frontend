import categories from '@/data/plans'

export async function generateStaticParams() {
  return categories.map(c => ({ category: c.id }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const cat = categories.find(c => c.id === category)
  if (!cat) return {}

  const seo = {
    froshgahi: {
      title: 'طراحی سایت فروشگاهی — پلن‌های اقتصادی، حرفه‌ای و اختصاصی | oven',
      description: 'طراحی سایت فروشگاهی با پلن‌های اقتصادی (۲۵ میلیون)، حرفه‌ای (۸۵ میلیون) و اختصاصی (۱۱۵ میلیون تومان). همه پلن‌ها شامل دامنه .ir رایگان.',
      keywords: 'طراحی سایت فروشگاهی, فروشگاه اینترنتی, طراحی فروشگاه آنلاین, قیمت فروشگاه اینترنتی',
    },
    sherkati: {
      title: 'طراحی سایت شرکتی — پلن‌های اقتصادی، حرفه‌ای و اختصاصی | oven',
      description: 'طراحی سایت شرکتی با پلن‌های اقتصادی (۲۵ میلیون)، حرفه‌ای (۸۵ میلیون) و اختصاصی (۱۱۵ میلیون تومان). همه پلن‌ها شامل دامنه .ir رایگان.',
      keywords: 'طراحی سایت شرکتی, طراحی سایت سازمانی, سایت شرکتی حرفه‌ای, قیمت طراحی سایت',
    },
  }

  const data = seo[category] || { title: cat.title, description: cat.description }

  return {
    title: { absolute: data.title },
    description: data.description,
    keywords: data.keywords || '',
    alternates: {
      canonical: `https://ovenweb.vercel.app/plans/${category}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://ovenweb.vercel.app/plans/${category}`,
      type: 'website',
      siteName: 'Oven',
      locale: 'fa_IR',
      images: [
        {
          url: 'https://ovenweb.vercel.app/og-telegram.webp',
          width: 1200,
          height: 630,
          alt: `${cat.title} | Oven`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['https://ovenweb.vercel.app/og-telegram.webp'],
    },
  }
}

export default function CategoryLayout({ children }) {
  return children
}
