'use client'

import { ReactElement, useState } from 'react'
import Button from '../shared/Button'
import { useSession } from 'next-auth/react'
import Modal from './Modal'
import useBooking from '~/hooks/useBooking'
import Spinner from '../shared/Spinner'

interface IProps {
  date: string
  numberOfPeople: number
  time: string
  handleReset: () => void
}

export enum BOOKING_STATUS {
  SUCCESS = 'ok',
  ERROR = 'error'
}

export default function WithoutOrder ({ date, handleReset, time, numberOfPeople }: IProps): ReactElement {
  const { data: session } = useSession()
  const [success, setSuccess] = useState<string | null>(null)
  const { isLoading, error, handleBooking } = useBooking()

  const handleClick = async (): Promise<void> => {
    if (session === null) {
      return
    }
    const res = await handleBooking({ date, numberOfPeople, time, userId: session.user.id })

    if (res !== null) {
      setSuccess(res)
    }
  }
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>Confirm Date & Time</h2>
      {
        isLoading
          ? (
            <div className='flex items-center justify-center pt-20'>
              <Spinner />
            </div>)
          : (
            <>
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
            </>)
      }
      {
        success !== null
          ? (<Modal status={BOOKING_STATUS.SUCCESS} handleReset={handleReset} />)
          : error !== null && (
            <Modal status={BOOKING_STATUS.ERROR} message={error} handleReset={handleReset} />)
      }
    </div>
  )
}
