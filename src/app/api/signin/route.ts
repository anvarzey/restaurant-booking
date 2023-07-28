import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'
import bcrypt from 'bcrypt'

export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json()
  const { email, password } = body

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!email || !password) {
    return NextResponse.json({ message: 'Email or password is missing' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user === null) {
    return NextResponse.json({ message: 'User does not exist' }, { status: 404 })
  }

  const canLogIn = await bcrypt.compare(password, user.password)

  if (!canLogIn) {
    return NextResponse.json({ message: 'Email or password incorrect' }, { status: 400 })
  }

  return NextResponse.json(user)
}
