'use client'

import { ReactElement } from 'react'
import { PRE_ORDER } from './Booking'
import Button from '../shared/Button'
import useCartStore from '~/lib/zustand/store'
import useCheckout from '~/hooks/useCheckout'
import { useRouter } from 'next/navigation'
import Spinner from '../shared/Spinner'

export default function PreOrderModal ({ handlePreOrder }: { handlePreOrder: (value: PRE_ORDER) => void }): ReactElement {
  const router = useRouter()
  const { items, totalQuantity } = useCartStore(state => ({ items: state.items, totalQuantity: state.totalQuantity }))
  const { error, handleCheckout, isLoading, resetError } = useCheckout()

  const handleClick = async (): Promise<void> => {
    const url = await handleCheckout(items)

    if (url) {
      await router.push(url)
    }
  }
  return (
    <div className=''>
      <div className='h-fit px-4 pt-2 rounded-lg'>
        <h3 className='text-center text-2xl pb-6'>
          Do you want to pre-order ?
        </h3>
        {
          error
            ? (
              <div>
                <h4 className='text-center text-xl'>An error has been occurred:</h4>
                <div className='text-center'>{error}</div>
                <div className='flex items-center justify-center'>
                  <Button variant='filled' onClick={resetError}>Try Again</Button>
                </div>
              </div>)
            : isLoading
              ? (
                <div className='flex items-center justify-center pt-16'>
                  <Spinner />
                </div>)
              : totalQuantity < 1
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
                    <div className='text-center'>You have {totalQuantity} products in your pre-order list</div>
                    <div className='flex items-center justify-around'>
                      <div>
                        <Button variant='outline' onClick={() => handlePreOrder(PRE_ORDER.PRE_ORDER)}>
                          Add more products
                        </Button>
                      </div>
                      <div>
                        <Button variant='filled' onClick={handleClick}>
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
