import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'
import bcrypt from 'bcrypt'

export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json()
  const { name, email, password } = body

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email or password is missing' }, { status: 400 })
  }

  const alreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (alreadyExists !== null) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return NextResponse.json(user)
}
