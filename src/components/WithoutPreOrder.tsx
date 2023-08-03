import { ReactElement } from 'react'
import Button from './Button'

export default function WithoutPreOrder ({ date, handleReset, time }: { date: string, handleReset: () => void, time: string }): ReactElement {
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>Confirm Date & Time</h2>
      <div className='text-center text-xl py-4'>
        You picked <span className='font-semibold'>{date}</span> at <span className='font-semibold'>{time}hs</span>
      </div>
      <div className='flex items-center justify-around'>
        <div>
          <Button onClick={handleReset} variant='outline'>
            Change Date/Time
          </Button>
        </div>
        <div>
          <Button variant='filled'>Confirm Booking</Button>
        </div>
      </div>
    </div>
  )
}
