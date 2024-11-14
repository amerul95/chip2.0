import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './app/lib/session';

export async function middleware(request: NextRequest) {
    const session = await getSession(); // Pass `request` to getSession if required
    const url = request.url
    const {pathname} = request.nextUrl

    // Redirect to login if the user is not logged in
    if (!session || !session.isLoggedIn) {
        return NextResponse.redirect(new URL('/login', url));
    }

    // // Redirect to dashboard if the user is not an admin
    // if (session.isAdmin === false) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    if(pathname.startsWith("/dashboard/bank-account/") && pathname.endsWith("/create-transaction")){
        if(!session || session.isAdmin === false){
            const redirectUrl = new URL('/dashboard/bank-account',url)
            redirectUrl.searchParams.set('error','access denied')
            session.isDeny === true
            return NextResponse.redirect(redirectUrl)
        }
    }


    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};
