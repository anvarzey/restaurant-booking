import { ReactElement } from 'react'
import Booking from '~/components/booking/Booking'
import Footer from '~/components/shared/Footer'
import Header from '~/components/shared/Header'
import { prisma } from '~/lib/prisma'

export default async function page (): Promise<ReactElement> {
  const closedDays = await prisma.closedDay.findMany()
  const formattedClosedDays = closedDays.map(closedDay => closedDay.date)
  return (
    <>
      <Header />
      <main className='min-h-screen bg-neutral-100'>
        <div className='lg:pt-28 lg:px-20 lg:pb-10'>
          <Booking closedDays={formattedClosedDays} />
        </div>
      </main>
      <Footer />
    </>
  )
}
