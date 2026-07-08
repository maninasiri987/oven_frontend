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
    openGraph: {
      title: `${service.title} | Oven`,
      description: service.shortDesc,
      url: `https://ovenweb.vercel.app/services/${service.slug}`,
      type: 'website',
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

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
