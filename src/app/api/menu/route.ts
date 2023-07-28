import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'

export const GET = async (req: Request): Promise<NextResponse> => {
  const menu = await prisma.menuItem.findMany()

  return NextResponse.json(menu)
}
