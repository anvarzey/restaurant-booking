'use client'

import { ReactElement } from 'react'
import { PRE_ORDER } from './Booking'
import Button from './Button'
import useCartStore from '~/lib/zustand/store'

export default function PreOrderModal ({ handlePreOrder }: { handlePreOrder: (value: PRE_ORDER) => void }): ReactElement {
  const totalQuantity = useCartStore(state => state.totalQuantity)
  return (
    <div className=''>
      <div className='h-fit px-4 pt-2 rounded-lg'>
        <h3 className='text-center text-2xl pb-6'>
          Do you want to pre-order ?
        </h3>
        {
          totalQuantity < 1
            ? (
              <div className='flex items-center justify-around'>
                <div>
                  <Button variant='outline' onClick={() => handlePreOrder(PRE_ORDER.NOT_PRE_ORDER)}>
                    No, continue with reservation
                  </Button>
                </div>
                <div>
                  <Button variant='filled' onClick={() => handlePreOrder(PRE_ORDER.PRE_ORDER)}>
                    Pre-Order Now
                  </Button>
                </div>
              </div>)
            : (
              <>
                <div className='text-center'>You have {totalQuantity} in your pre-order list</div>
                <div className='flex items-center justify-around'>
                  <div>
                    <Button variant='outline' onClick={() => handlePreOrder(PRE_ORDER.PRE_ORDER)}>
                      Add more products
                    </Button>
                  </div>
                  <div>
                    <Button link href='/checkout' variant='filled'>
                      Go to Checkout
                    </Button>
                  </div>
                </div>
              </>)
        }
      </div>
    </div>
  )
}
