import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'

export const GET = async (req: Request): Promise<NextResponse> => {
  const res = await prisma.closedDay.findMany()

  return NextResponse.json({ data: res })
}
