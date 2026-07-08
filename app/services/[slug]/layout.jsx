import services from '@/data/services'

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  if (!service) return {}

  return {
    title: service.title,
    description: service.shortDesc,
    alternates: {
      canonical: `https://ovenweb.vercel.app/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Oven`,
      description: service.shortDesc,
      url: `https://ovenweb.vercel.app/services/${service.slug}`,
      type: 'website',
      images: [
        {
          url: 'https://ovenweb.vercel.app/og-telegram.png',
          width: 1200,
          height: 630,
          alt: `${service.title} - Oven`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://ovenweb.vercel.app/og-telegram.png'],
    },
  }
}

export default async function ServiceSlugLayout({ children, params }) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

  const jsonLd = service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDesc,
    provider: {
      '@type': 'Organization',
      name: 'Oven',
      url: 'https://ovenweb.vercel.app',
    },
    url: `https://ovenweb.vercel.app/services/${service.slug}`,
  } : null

  const faqJsonLd = service?.faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {children}
    </>
  )
}
