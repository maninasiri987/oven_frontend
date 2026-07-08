export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: 'https://ovenweb.vercel.app/sitemap.xml',
  }
}
