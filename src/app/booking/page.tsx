import { ReactElement } from 'react'
import Booking from '~/components/booking/Booking'
import Footer from '~/components/shared/Footer'
import Header from '~/components/shared/Header'
import { prisma } from '~/lib/prisma'

export default async function page (): Promise<ReactElement> {
  const closedDays = await prisma.closedDay.findMany()
  const formattedClosedDays = closedDays.map(closedDay => closedDay.date)
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='grow bg-neutral-100 max-w-screen-xl mx-auto'>
        <div className='lg:pt-28 lg:px-20 lg:pb-10'>
          <Booking closedDays={formattedClosedDays} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
