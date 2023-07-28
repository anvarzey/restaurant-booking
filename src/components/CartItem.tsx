'use client'

import { ChangeEventHandler, ReactElement } from 'react'
import useCartStore from '~/lib/zustand/store'

interface Item {
  id: string
  quantity: number
  price: number
  priceWithDiscount: number
}

export default function CartItem ({ item }: { item: Item }): ReactElement {
  const update = useCartStore(state => state.update)

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = item.id
    const quantity = Number(e.target.value)
    update(id, quantity)
  }
  return (
    <li className='flex items-center justify-around'>
      <span>{item.id}</span>
      <div>
        <select
          name=''
          id=''
          value={item.quantity}
          onChange={handleChange}
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
