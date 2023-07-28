'use client'

import { isEqual } from 'date-fns'
import { ReactElement } from 'react'
import ReactCalendar from 'react-calendar'
import { Value } from 'react-calendar/dist/cjs/shared/types'

export default function Calendar ({ closedDays, handleDate }: { closedDays: string[], handleDate: (newDate: Date | undefined) => void }): ReactElement {
  const handleDisabled = ({ date }: { date: Date }): boolean => {
    const isClosed = closedDays?.find(closedDay => isEqual(new Date(closedDay), date))
    return !(isClosed === undefined || isClosed === null)
  }

  return (
    <div className='w-3/4 mx-auto'>
      <ReactCalendar
        minDate={new Date()}
        view='month'
        tileDisabled={handleDisabled}
        onChange={(value: Value) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              if (value[0] !== null) {
                handleDate(value[0])
              }
            } else {
              handleDate(value)
            }
          } else {
            handleDate(undefined)
          }
        }}
      />
    </div>
  )
}
