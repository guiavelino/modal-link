import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwtDecode from 'jwt-decode';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('next-auth.session-token');

    if (session) {
        const data = jwtDecode(session.value);
        
        if (data) return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', request.url));
}
 
export const config = {
  matcher: [
    '/home',
    '/solicitar-modal',
    '/solicitacoes/:path*',
  ],
}