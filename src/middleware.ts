import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwtDecode from 'jwt-decode';
import isMobile from './utils/isMobile';

export function middleware(request: NextRequest) {
  const isUserOnMobile = isMobile(request);
    
  if (!isUserOnMobile) {
    return NextResponse.redirect(new URL('/enable-only-mobile', request.url));
  }

  const session = request.cookies.get('next-auth.session-token');

  if (session) {
    const data = jwtDecode(session.value);

    if (data) {
      if (request.nextUrl.pathname === '/cadastre-se' || request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/solicitacoes', request.url));
      }

      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname === '/cadastre-se' || request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url));
}
 
export const config = {
  matcher: [
    '/login',
    '/cadastre-se',
    '/solicitar-modal',
    '/solicitacoes/:path*'
  ]
}