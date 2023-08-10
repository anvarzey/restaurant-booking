'use client'

import { ReactElement, useState } from 'react'
import Button from '../shared/Button'
import { useSession } from 'next-auth/react'
import Modal from './Modal'
import { handleBooking } from '~/services/booking'

interface IProps {
  date: string
  numberOfPeople: number
  time: string
  handleReset: () => void
}

interface IStatus {
  type: string
  message: string
}

export default function WithoutPreOrder ({ date, handleReset, time, numberOfPeople }: IProps): ReactElement {
  const { data: session } = useSession()
  const [status, setStatus] = useState<IStatus | undefined>(undefined)

  const handleClick = async (): Promise<void> => {
    if (session === null) {
      return
    }
    const res = await handleBooking({ date, numberOfPeople, time, userId: session.user.id })
    setStatus(res)
  }
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
          <Button variant='filled' onClick={handleClick}>Confirm Booking</Button>
        </div>
      </div>
      {
        status !== undefined &&
        (<Modal status={status.type} message={status.message} handleReset={handleReset} />)
      }
    </div>
  )
}
