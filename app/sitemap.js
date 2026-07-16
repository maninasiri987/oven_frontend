export default function sitemap() {
  const base = 'https://ovenweb.vercel.app'
  const now = new Date()
  const services = ['fast-web', 'pro-web', 'seo', 'custom-theme', 'rescue', 'support']

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...services.map(s => ({
      url: `${base}/services/${s}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { url: `${base}/plans`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/project`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
