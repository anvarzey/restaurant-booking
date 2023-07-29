import { NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'

export const GET = async (
  req: Request
): Promise<NextResponse> => {
  const url = new URL(req.url)
  const category = url.searchParams.get('category')

  const formattedCat = category?.replace(category[0], category[0].toUpperCase())

  const menu = await prisma.product.findMany({
    where: {
      category: formattedCat
    }
  })
  return NextResponse.json(menu)
}
