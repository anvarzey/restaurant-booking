'use client'

import { ChangeEventHandler, ReactElement } from 'react'
import { BiSolidMinusCircle } from 'react-icons/bi'
import useOrderStore from '~/lib/zustand/store'

interface Item {
  id: string
  name: string
  image: string
  quantity: number
  price: number
  priceWithDiscount: number
}

export default function OrderItem ({ item }: { item: Item }): ReactElement {
  const { remove, update } = useOrderStore((state) => ({ remove: state.remove, update: state.update }))

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = item.id
    const quantity = Number(e.target.value)
    update(id, quantity)
  }
  return (
    <li className='flex items-center justify-between'>
      <button className='h-4 w-4' onClick={() => remove(item.id)}>
        <BiSolidMinusCircle className='h-full w-auto text-primary' />
      </button>
      <div className='text-lg truncate'>{item.name}</div>
      <div>
        <span>x</span>
        <select
          name=''
          id=''
          value={item.quantity}
          onChange={handleChange}
          className='cursor-pointer'
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
        </select>
      </div>
    </li>
  )
}
