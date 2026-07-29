import categories from '@/data/plans'

export default function sitemap() {
  const base = 'https://ovenweb.vercel.app'
  const now = new Date()
  const services = ['seo', 'custom-theme', 'rescue', 'support']
  const planUrls = []

  for (const cat of categories) {
    planUrls.push({
      url: `${base}/plans/${cat.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    for (const plan of cat.plans) {
      planUrls.push({
        url: `${base}/plans/${cat.id}/${plan.id}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...services.map(s => ({
      url: `${base}/services/${s}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { url: `${base}/plans`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...planUrls,
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
