import { NextResponse } from 'next/server';

const CANONICAL_HOST = 'www.discoverinternationalmedicalservice.com';

export async function middleware(request) {
    const host = request.headers.get('host') || '';
    if (host !== CANONICAL_HOST && host.endsWith('discoverinternationalmedicalservice.com')) {
        const canonicalUrl = new URL(request.nextUrl);
        canonicalUrl.host = CANONICAL_HOST;
        canonicalUrl.port = '';
        return NextResponse.redirect(canonicalUrl, 301);
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
