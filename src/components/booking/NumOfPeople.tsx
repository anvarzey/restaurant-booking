'use client'

import { ChangeEvent, ReactElement, useState } from 'react'
import Button from '../shared/Button'
import { artifika } from '~/utils/fonts'

interface IProps {
  handleNumOfPeople: (num: number) => void
}

export default function NumOfPeople ({ handleNumOfPeople }: IProps): ReactElement {
  const [num, setNum] = useState(0)
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setNum(Number(e.target.value))
  }

  const handleClick = (): void => {
    handleNumOfPeople(num)
  }
  return (
    <>
      <h2 className={`text-3xl text-center mb-24 ${artifika.className}`}>How many people is the booking for?</h2>
      <div className='flex flex-col gap-6 w-1/4 mx-auto'>
        <select name='people-selector' id='people-selector' onChange={handleChange} className='w-1/2 mx-auto appearance-none px-4 py-2 bg-neutral-200 rounded-xl text-center cursor-pointer'>
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='13'>13</option>
          <option value='14'>14</option>
          <option value='15'>15</option>
        </select>
        <div>
          <Button variant='filled' disabled={num < 1} onClick={handleClick}>Confirm</Button>
        </div>
      </div>
    </>
  )
}
