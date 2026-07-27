import { NextResponse } from 'next/server';
import { serverAuth } from './helpers/lib/session';

export async function middleware(request) {
    const isAuth = await serverAuth()

    if (isAuth) {
        return NextResponse.next()
    }
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
}

export const config = {
    matcher: [
        "/my-profile",
    ],
}