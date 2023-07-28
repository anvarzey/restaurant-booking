import { ReactElement } from 'react'

export default function WithoutPreOrder ({ date, handleReset, time }: { date: string, handleReset: () => void, time: string }): ReactElement {
  return (
    <div>
      <h2>Confirm Date & Time</h2>
      <div>
        You picked {date} at {time}hs
      </div>
      <div className='flex items-center justify-between'>
        <button onClick={handleReset}>Change Date/Time</button>
        <button>Confirm Booking</button>
      </div>
    </div>
  )
}
