import { add, format, setHours, setMinutes } from 'date-fns'

export interface RetProps {
  index: number
  value: string
}

const getTimes = (): RetProps[] => {
  const beginning = setHours(setMinutes(new Date(), 0), 0)
  const end = add(beginning, { hours: 24 })
  const interval = 30

  let timesArr = []

  for (let i = beginning; i < end; i = add(i, { minutes: interval })) {
    timesArr.push(i)
  }

  timesArr.push(add(timesArr[timesArr.length - 1], { minutes: 29 }))

  timesArr = timesArr.map((timeItem, i) => ({ index: i, value: format(timeItem, 'HH:mm') }))

  return timesArr
}

export const times = getTimes()
