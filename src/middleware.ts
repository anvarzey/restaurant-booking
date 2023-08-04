import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

async function middleware (req: NextRequest): Promise<NextResponse> {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl
  const url = req.nextUrl.clone()

  if (pathname.startsWith('/admin')) {
    if (token?.role === 'ADMIN') {
      return NextResponse.next()
    }
    url.pathname = '/403'
    return NextResponse.rewrite(url)
  } else if (pathname.startsWith('/booking')) {
    if (token !== null) {
      return NextResponse.next()
    }
    url.pathname = '/auth/signin'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export default middleware
