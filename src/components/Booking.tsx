'use client'

import { ReactElement, useState } from 'react'
import Calendar from './Calendar'
import PreOrderModal from './PreOrderModal'
import TimePicker from './TimePicker'
import WithPreOrder from './WithPreOrder'
import WithoutPreOrder from './WithoutPreOrder'
import format from 'date-fns/format'

export enum PRE_ORDER {
  NOT_PRE_ORDER = -1,
  NOT_CONFIRMED = 0,
  PRE_ORDER = 1
}

export default function Booking ({ closedDays }: { closedDays: string[] }): ReactElement {
  const [date, setDate] = useState<string | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [preOrder, setPreOrder] = useState<PRE_ORDER>(PRE_ORDER.NOT_CONFIRMED)

  const handleDate = (newDate: Date | undefined): void => {
    if (newDate !== undefined) {
      const parsedDate = format(newDate, 'y/MM/dd')
      setDate(parsedDate)
    } else {
      setDate(undefined)
    }
  }

  const handleReset = (): void => {
    setDate(undefined)
    setTime(undefined)
    setPreOrder(PRE_ORDER.NOT_CONFIRMED)
  }

  const handleTime = (newTime: string): void => {
    setTime(newTime)
  }

  const handlePreOrder = (value: PRE_ORDER): void => {
    setPreOrder(value)
  }

  return (
    <div>
      {
        date === undefined
          ? <Calendar closedDays={closedDays} handleDate={handleDate} />
          : time === undefined
            ? <TimePicker date={date} handleTime={handleTime} />
            : preOrder === PRE_ORDER.NOT_CONFIRMED
              ? <PreOrderModal handlePreOrder={handlePreOrder} />
              : preOrder === PRE_ORDER.PRE_ORDER
                ? <WithPreOrder />
                : <WithoutPreOrder date={date} time={time} handleReset={handleReset} />
      }
    </div>
  )
}
