'use client'

import { ReactElement, useState } from 'react'
import Calendar from '../shared/Calendar'
import OrderModal from './OrderModal'
import TimePicker from './TimePicker'
import WithOrder from './WithOrder'
import WithoutOrder from './WithoutOrder'
import format from 'date-fns/format'
import NumOfPeople from './NumOfPeople'

export enum ORDER {
  NOT_ORDER = -1,
  NOT_CONFIRMED = 0,
  ORDER = 1
}

export default function Booking ({ closedDays }: { closedDays: string[] }): ReactElement {
  const [date, setDate] = useState<string | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [numOfPeople, setNumOfPeople] = useState(0)
  const [order, setOrder] = useState<ORDER>(ORDER.NOT_CONFIRMED)

  const handleDate = (newDate: Date | undefined): void => {
    if (newDate !== undefined) {
      const parsedDate = format(newDate, 'y/MM/dd')
      setDate(parsedDate)
    } else {
      setDate(undefined)
    }
  }

  const handleNumOfPeople = (num: number): void => {
    setNumOfPeople(num)
  }

  const handleOrder = (value: ORDER): void => {
    setOrder(value)
  }

  const handleReset = (): void => {
    setDate(undefined)
    setTime(undefined)
    setOrder(ORDER.NOT_CONFIRMED)
  }

  const handleTime = (newTime: string): void => {
    setTime(newTime)
  }

  return (
    <div>
      {
        numOfPeople < 1
          ? <NumOfPeople handleNumOfPeople={handleNumOfPeople} />
          : date === undefined
            ? <Calendar closedDays={closedDays} handleDate={handleDate} />
            : time === undefined
              ? <TimePicker date={date} handleTime={handleTime} handleReset={handleReset} />
              : order === ORDER.NOT_CONFIRMED
                ? <OrderModal handleOrder={handleOrder} />
                : order === ORDER.ORDER
                  ? <WithOrder />
                  : <WithoutOrder date={date} numberOfPeople={numOfPeople} time={time} handleReset={handleReset} />
      }
    </div>
  )
}
