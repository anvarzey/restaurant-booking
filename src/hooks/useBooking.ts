'use client'

import { useState } from 'react'
import formatDateTime from '~/utils/formatDateTime'

export interface IReturn {
  error: string | null
  handleBooking: (args: IProps) => Promise<string | null>
  isLoading: boolean
}

interface IProps {
  date: string
  numberOfPeople: number
  time: string
  userId: string
}

export default function useBooking (): IReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBooking = async ({ date, numberOfPeople, time, userId }: IProps): Promise<string | null> => {
    setIsLoading(true)
    const dateTime = formatDateTime({ date, time })
    const data = {
      id: userId,
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

      setIsLoading(false)

      if (res?.message === 'OK') {
        return res.message
      } else {
        setError(res.error ?? 'An error has been occurred')
        return null
      }
    } else {
      setError('Date or Time is missing or has wrong format')
      return null
    }
  }

  return {
    error,
    handleBooking,
    isLoading
  }
}
