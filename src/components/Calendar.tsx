'use client'

import { ReactElement } from 'react'
import { isEqual } from 'date-fns'
import ReactCalendar from 'react-calendar'
import { Value } from 'react-calendar/dist/cjs/shared/types'
import { artifika } from '~/utils/fonts'

interface IProps {
  closedDays: string[]
  handleDate: (newDate: Date | undefined) => void
}

export default function Calendar ({ closedDays, handleDate }: IProps): ReactElement {
  const handleDisabled = ({ date }: { date: Date }): boolean => {
    const isClosed = closedDays?.find(closedDay => isEqual(new Date(closedDay), date))
    return !(isClosed === undefined || isClosed === null)
  }

  return (
    <>
      <h2 className={`text-3xl text-center mb-4 ${artifika.className}`}>Select day to make a reservation</h2>
      <div className='w-3/4 mx-auto rounded-xl overflow-hidden'>
        <ReactCalendar
          minDate={new Date()}
          view='month'
          className='rounded-xl'
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
    </>
  )
}
