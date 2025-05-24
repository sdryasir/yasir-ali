// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const userRole = request.cookies.get('role')?.value

  if (isAdminRoute && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/admin/:path*']
}