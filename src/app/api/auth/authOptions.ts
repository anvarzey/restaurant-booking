import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '~/lib/prisma'
import bcrypt from 'bcrypt'
import { SessionStrategy } from 'next-auth'

const authOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Jason Format' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        if (credentials === undefined) {
          return null
        }

        const { email, password } = credentials

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!email || !password) {
          // return NextResponse.json({ message: 'Email or password is missing' }, { status: 400 })
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (user === null) {
          // return NextResponse.json({ message: 'User does not exist' }, { status: 404 })
          return null
        }

        const canLogIn = await bcrypt.compare(password, user.password)

        if (!canLogIn) {
          // return NextResponse.json({ message: 'Email or password incorrect' }, { status: 400 })
          return null
        }

        return user
      }
    })
  ]
}

export default authOptions
