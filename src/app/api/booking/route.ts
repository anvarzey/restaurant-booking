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

    const userRes = await prisma.user.update({
      where: { id },
      data: {
        reservationsIds: { push: bookingRes.id }
      }
    })

    console.log({
      bookingRes,
      userRes
    })

    return NextResponse.json({ message: 'OK' })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}