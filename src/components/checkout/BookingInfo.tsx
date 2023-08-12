'use client'

import Image from 'next/image'
import { ReactElement } from 'react'
import useOrderStore from '~/lib/zustand/store'

export default function BookingInfo (): ReactElement {
  const items = useOrderStore(state => state.items)
  return (
    <>
      {
        items.length >= 1
          ? (
            <ul className='w-3/4'>
              {items.map(item => (
                <li key={item.name} className='flex items-center justify-between'>
                  <div className='flex items-center gap-6'>
                    <div className='h-20 w-20 relative'>
                      <Image src={item.image} fill alt={item.name} className='h-full w-auto object-cover' />
                    </div>
                    <div>{item.name}</div>
                  </div>
                  <div>{item.quantity}</div>
                </li>
              ))}
            </ul>)
          : <div>BookingInfo</div>
      }
    </>
  )
}
