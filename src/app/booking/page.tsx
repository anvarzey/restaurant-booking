import Link from 'next/link'
import { ReactElement } from 'react'
import Booking from '~/components/Booking'
import { prisma } from '~/lib/prisma'

export default async function page (): Promise<ReactElement> {
  const closedDays = await prisma.closedDay.findMany()
  const formattedClosedDays = closedDays.map(closedDay => closedDay.date)
  return (
    <div>
      <header className='flex items-center justify-around pt-1 pb-3'>
        <Link href='/' className='px-2 py-1 rounded-lg bg-emerald-700 text-white'>Home</Link>
        <h2>Select day to make a reservation</h2>
      </header>
      <Booking closedDays={formattedClosedDays} />
    </div>
  )
}
