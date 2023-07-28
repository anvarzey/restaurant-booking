import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'

export const GET = async (req: Request): Promise<NextResponse> => {
  const res = await prisma.day.findMany()

  return NextResponse.json({ data: res })
}
