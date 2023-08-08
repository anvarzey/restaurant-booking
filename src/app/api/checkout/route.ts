import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '~/lib/prisma'

interface IReqBodyProduct {
  id: string
  quantity: number
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const body: IReqBodyProduct[] = await req.json()
  if (body === undefined || body.length < 1) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  const ids = body.map(product => product.id)

  const productsList = await prisma.product.findMany({
    where: {
      id: { in: ids }
    }
  })

  const formattedProductsList = body.map(product => {
    const productInfo = productsList.find(prod => prod.id === product.id)

    return {
      price: productInfo?.priceId,
      quantity: product.quantity
    }
  })

  const { STRIPE_SECRET } = process.env
  const stripe = new Stripe(STRIPE_SECRET as string, {
    apiVersion: '2022-11-15',
    typescript: true
  })

  const session = await stripe.checkout.sessions.create({
    line_items: formattedProductsList,
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout/success',
    cancel_url: 'http://localhost:3000/checkout/canceled'
  })

  if (session.url !== null) {
    return NextResponse.json({ url: session.url })
  }

  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
