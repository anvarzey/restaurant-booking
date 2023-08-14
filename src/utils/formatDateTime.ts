interface IProps {
  date: string
  time: string
}

const formatDateTime = ({ date, time }: IProps): Date | null => {
  if (date.length < 10 || time.length < 5) {
    return null
  }
  const dateArr = date.split('/').map((num, i) => i === 1 ? Number(num) - 1 : Number(num))

  const timeArr = time.split(':').map(num => Number(num))

  const dateTime = new Date(dateArr[0], dateArr[1], dateArr[2], timeArr[0], timeArr[1])
  return dateTime
}

export default formatDateTime
