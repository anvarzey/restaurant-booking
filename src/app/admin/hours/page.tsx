import { ReactElement } from 'react'
import HoursTable from './HoursTable'
import Calendar from '~/components/Calendar'
import { prisma } from '~/lib/prisma'

export default async function page (): Promise<ReactElement> {
  const closedDays = await prisma.closedDay.findMany()
  const formattedClosedDays = closedDays.map(closedDay => closedDay.date)
  return (
    <div className='grow'>
      <HoursTable />
      <Calendar closedDays={formattedClosedDays} />
    </div>
  )
}
