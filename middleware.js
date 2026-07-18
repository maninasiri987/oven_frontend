import { NextResponse } from 'next/server'
import { isValidSession } from '@/lib/auth'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    const session = request.cookies.get('dashboard_session')
    const valid = await isValidSession(session?.value)

    if (!valid) {
      const loginUrl = new URL('/dashboard/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
