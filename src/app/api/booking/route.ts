import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'

export const POST = async (req: Request): Promise<NextResponse> => {
  const body = await req.json()
  const { id, dateTime, numberOfPeople, preOrder } = body

  if (id === undefined || dateTime === undefined) {
    return NextResponse.json({ error: 'Some data is missing' }, { status: 400 })
  }

  const bookingData = {
    clientId: id,
    dateTime,
    numberOfPeople,
    preOrder
  }

  try {
    const bookingRes = await prisma.reservation.create({
      data: {
        ...bookingData
      }
    })

    await prisma.user.update({
      where: { id },
      data: {
        reservationsIds: { push: bookingRes.id }
      }
    })

    return NextResponse.json({ message: 'OK' })
  } catch (e) {
    if (e instanceof Error) {
      if (e.name === 'PrismaClientValidationError') {
        const errorMessage = e.message.split('\n').pop()

        return NextResponse.json({ error: errorMessage }, { status: 400 })
      }
      return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
  }
  return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
}
