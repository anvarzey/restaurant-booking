import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware (req) {
    console.log('MIDDLEWARE', req)
  },
  {
    callbacks: {
      authorized ({ token, req }) {
        const { pathname } = req.nextUrl
        if (pathname.startsWith('/admin')) {
          if (token?.role === 'ADMIN') {
            return true
          }
          return false
        }
        if (token != null) return true
        return false
      }
    }
  }
)

export const config = { matcher: ['/admin/:path*', '/booking/:path*'] }
