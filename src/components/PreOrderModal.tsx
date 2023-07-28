'use client'

import { ReactElement } from 'react'
import { PRE_ORDER } from './Booking'

export default function PreOrderModal ({ handlePreOrder }: { handlePreOrder: (value: PRE_ORDER) => void }): ReactElement {
  return (
    <div className='h-screen w-screen fixed bg-black/20 flex items-center justify-center'>
      <div className='w-2/5 h-fit px-4 py-2 rounded-lg bg-white'>
        <div className='text-center'>
          Do you want to pre-order ?
        </div>
        <div className='flex items-center justify-between'>
          <button onClick={() => handlePreOrder(PRE_ORDER.NOT_PRE_ORDER)}>
            No, continue with reservation
          </button>
          <button onClick={() => handlePreOrder(PRE_ORDER.PRE_ORDER)}>
            Pre-Order Now
          </button>
        </div>
      </div>
    </div>
  )
}
