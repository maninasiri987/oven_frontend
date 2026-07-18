import { NextResponse } from 'next/server'
import { createSessionValue, safeEqual } from '@/lib/auth'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const dashboardPassword = process.env.DASHBOARD_PASSWORD
    if (!dashboardPassword) {
      console.error('DASHBOARD_PASSWORD env var not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (!safeEqual(password, dashboardPassword)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const sessionValue = await createSessionValue()

    const response = NextResponse.json({ success: true })

    response.cookies.set('dashboard_session', sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })

  response.cookies.set('dashboard_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return response
}
