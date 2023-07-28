'use client'

import Image from 'next/image'
import { ReactElement, useState } from 'react'
import useCartStore from '~/lib/zustand/store'

interface IProps {
  menuItem: {
    id: string
    name: string
    category: string
    image: string
    price: number
    priceWithDiscount: number
  }
}

export default function MenuItem ({ menuItem }: IProps): ReactElement {
  const [quant, setQuant] = useState(0)
  const add = useCartStore(state => state.add)

  const handleClick = (): void => {
    add({
      id: menuItem.id,
      quantity: quant,
      price: menuItem.price,
      priceWithDiscount: menuItem.priceWithDiscount
    })
  }

  return (
    <li className='border px-2 py-4'>
      <div className='h-20 w-full relative flex justify-center'>
        {/* <img src={menuItem.image} alt='Alter ego' /> */}
        <Image src={menuItem.image} fill alt={menuItem.name} />
      </div>
      <div className='font-bold'>{menuItem.name}</div>
      <div className='flex items-end gap-2'>
        <span>{menuItem.price}</span>
        <span className='text-lg font-bold'>{menuItem.priceWithDiscount}</span>
      </div>
      <div>
        <select name='quantity' id='quantity' onChange={(e) => setQuant(Number(e.target.value))}>
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
        </select>
      </div>
      <div>
        <button onClick={handleClick} disabled={quant <= 0}>
          Add to cart
        </button>
      </div>
    </li>
  )
}
