import { ReactElement } from 'react'
import { prisma } from '~/lib/prisma'
import { times } from '~/utils/times'

export default async function HoursTable (): Promise<ReactElement> {
  const data = await prisma.day.findMany()

  return (
    <div>
      <ul className='w-1/2'>
        {
          data?.map(day => (
            <li key={day.id} className='flex items-center justify-between w-full'>
              <span>{day.name}</span>
              <select name='' id='' defaultValue={day.openTime}>
                {
                  times.map(time => (
                    <option key={time.index} value={time.value}>
                      {time.value}
                    </option>
                  ))
                }
              </select>
              <select name='' id='' defaultValue={day.closeTime}>
                {
                  times.map(time => (
                    <option key={time.index} value={time.value}>
                      {time.value}
                    </option>
                  ))
                }
              </select>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
