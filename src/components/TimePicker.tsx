import { ReactElement } from 'react'
import { times } from '~/utils/times'
import useSWR from 'swr'
import { isAfter, isBefore, parse } from 'date-fns'

export default function TimePicker ({ date, handleTime }: { date: string, handleTime: (newTime: string) => void }): ReactElement {
  const weekDay = new Date(date).getDay()
  // const getOpeningHours = await fetch(`/api/hours/${weekDay}`).then(async res => await res.json())
  const { data, error, isLoading } = useSWR(`/api/hours/${weekDay}`)
  // console.log(getOpeningHours())
  return (
    <div>
      <h2>Times</h2>
      <ul className='flex flex-wrap items-center gap-2'>
        {
          error !== undefined
            ? <div>An error has been occurred !</div>
            : isLoading
              ? <div>Loading...</div>
              : times
                .filter(time => isAfter(parse(time.value, 'HH:mm', new Date()), parse(data.openTime, 'HH:mm', new Date())) && isBefore(parse(time.value, 'HH:mm', new Date()), parse(data.closeTime, 'HH:mm', new Date())))
                .map(timeInRange => (
                  <li
                    key={timeInRange.index}
                    className='cursor-pointer font-bold text-emerald-600 hover:bg-emerald-100 px-2 py-1'
                    onClick={() => handleTime(timeInRange.value)}
                  >
                    {timeInRange.value}
                  </li>
                ))
        }
      </ul>
    </div>
  )
}
