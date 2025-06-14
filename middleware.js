import { NextResponse } from 'next/server';

export async function middleware(req) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.ip ||
    req.socket?.remoteAddress || '';

  const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,query`, {
    next: { revalidate: 60 },
  });

  const locationData = await geoRes.json();

  const res = NextResponse.next();
  res.headers.set('x-ip', locationData.query || ip || '');
  res.headers.set('x-location', `${locationData.city}, ${locationData.regionName}, ${locationData.country}`);

  return res;
}

// Apply only to NextAuth routes
export const config = {
  matcher: ['/api/auth/:path*'],
};
