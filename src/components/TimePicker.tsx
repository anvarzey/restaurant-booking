import { ReactElement } from 'react'
import { times } from '~/utils/times'
import useSWR from 'swr'
import { isAfter, isBefore, parse } from 'date-fns'
import { artifika } from '~/utils/fonts'

interface IProps {
  date: string
  handleReset: () => void
  handleTime: (newTime: string) => void
}

export default function TimePicker ({ date, handleReset, handleTime }: IProps): ReactElement {
  const weekDay = new Date(date).getDay()

  const { data, error, isLoading } = useSWR(`/api/hours/${weekDay}`)

  return (
    <div>
      <h2 className={`text-3xl text-center ${artifika.className}`}>Pick your time</h2>
      <div className='pb-8'>
        <button onClick={handleReset} className='px-2 py-1 font-bold text-primary'>
          Return to calendar
        </button>
        <h2 className='text-lg font-semibold text-center mb-4'>Available Times</h2>
      </div>
      <ul className='times-grid'>
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
                    className='cursor-pointer font-bold border text-neutral-700 border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl flex items-center justify-center'
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
