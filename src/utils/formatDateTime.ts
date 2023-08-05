interface IProps {
  date: string
  time: string
}

const formatDateTime = ({ date, time }: IProps): Date | null => {
  if (date === undefined || time === undefined) {
    return null
  }
  const dateArr = date.split('/').map((num, i) => i === 1 ? Number(num) - 1 : Number(num))

  const timeArr = time.split(':').map(num => Number(num))

  const dateTime = new Date(...dateArr, ...timeArr)
  return dateTime
}

export default formatDateTime
