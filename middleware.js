import { NextResponse } from 'next/server';
import { serverAuth } from './helpers/lib/session';

const CANONICAL_HOST = 'www.discoverinternationalmedicalservice.com';

const AUTH_PATHS = [
    '/our-services/appointment',
    '/our-services/visaprocessing',
    '/our-services/telemedicine',
    '/our-services/order-medicine',
    '/our-services/medical-record',
    '/my-profile',
    '/check-up',
];

export async function middleware(request) {
    const host = request.headers.get('host') || '';
    if (host !== CANONICAL_HOST && host.endsWith('discoverinternationalmedicalservice.com')) {
        const canonicalUrl = new URL(request.nextUrl);
        canonicalUrl.host = CANONICAL_HOST;
        canonicalUrl.port = '';
        return NextResponse.redirect(canonicalUrl, 301);
    }

    if (AUTH_PATHS.includes(request.nextUrl.pathname)) {
        const isAuth = await serverAuth()
        if (!isAuth) {
            const loginUrl = new URL('/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
