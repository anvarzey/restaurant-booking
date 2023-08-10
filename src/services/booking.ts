import formatDateTime from '~/utils/formatDateTime'

enum StatusType {
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IProps {
  date: string
  numberOfPeople: number
  time: string
  userId: string
}

interface IStatus {
  type: StatusType
  message: string
}

export const handleBooking = async ({ date, numberOfPeople, time, userId }: IProps): Promise<IStatus> => {
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

    if (res.message !== undefined) {
      return {
        type: StatusType.SUCCESS,
        message: res.message
      }
    } else {
      return {
        type: StatusType.ERROR,
        message: res.error ?? 'An error has been occurred'
      }
    }
  } else {
    return {
      type: StatusType.ERROR,
      message: 'An error has been occurred'
    }
  }
}
