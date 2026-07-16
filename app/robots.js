export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/project'],
      },
    ],
    sitemap: 'https://ovenweb.vercel.app/sitemap.xml',
  }
}
