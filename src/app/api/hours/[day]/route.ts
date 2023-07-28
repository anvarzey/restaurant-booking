import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'

export const GET = async (req: Request, { params }: { params: { day: string } }): Promise<NextResponse> => {
  const dayIndex = Number(params.day)
  const dayInfo = await prisma.day.findUnique({
    where: {
      dayOfWeek: dayIndex
    }
  })

  return NextResponse.json(dayInfo)
}
