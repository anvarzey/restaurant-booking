'use client'

import { ReactElement, useState } from 'react'
import Button from '../shared/Button'
import formatDateTime from '~/utils/formatDateTime'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import Modal from './Modal'

interface ISession extends Session {
  id: string
  role: string
}

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
  const { data: session }: { data: ISession } = useSession()
  const [status, setStatus] = useState<IStatus | undefined>(undefined)

  const handleClick = async (): Promise<void> => {
    const dateTime = formatDateTime({ date, time })
    const data = {
      id: session?.user?.id,
      dateTime,
      numberOfPeople,
      preOrder: null
    }
    if (dateTime !== null) {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(async res => await res.json())

      if (res.message !== undefined) {
        setStatus({
          type: 'success',
          message: res.message
        })
      } else {
        setStatus({
          type: 'error',
          message: res.error
        })
      }
    }
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
