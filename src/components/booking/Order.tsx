'use client'

import { ReactElement } from 'react'
import useOrderStore from '~/lib/zustand/store'
import OrderItem from './OrderItem'
import { artifika } from '~/utils/fonts'
import Button from '../shared/Button'
import formatPrice from '~/utils/formatPrice'
import { useRouter } from 'next/navigation'
import useCheckout from '~/hooks/useCheckout'
import Spinner from '../shared/Spinner'

export default function Order (): ReactElement {
  const { items, total } = useOrderStore(state => ({ items: state.items, total: state.total }))
  const { error, handleCheckout, isLoading, resetError } = useCheckout()
  const router = useRouter()

  const handleClick = async (): Promise<void> => {
    const url = await handleCheckout(items)
    if (url) {
      await router.push(url)
    }
  }

  return (
    <>
      {
        isLoading
          ? (
            <div className='fixed h-screen w- inset-0 bg-black/30 flex items-center justify-center overflow-hidden z-10'>
              <div className=''>
                <Spinner />
              </div>
            </div>)
          : error && (
            <div className='absolute h-screen w-full bg-black/20 flex items-center justify-center'>
              <div className='bg-white'>
                <h3>An error has been occurred:</h3>
                <div>{error}</div>
                <div className='flex items-center justify-center'>
                  <Button variant='outline' onClick={resetError}>
                    Try Again
                  </Button>
                </div>
              </div>
            </div>)
      }
      <div className='bg-white rounded-xl px-4 pt-3 pb-6 border border-neutral-700 w-1/4 h-fit'>
        <h4 className={`text-2xl pb-4 ${artifika.className}`}>Order</h4>
        <ul className='pb-8'>
          {
            items.map((item, i) => (
              <OrderItem key={i} item={item} />
            ))
          }
        </ul>
        <div className='flex items-center justify-between pb-4'>
          <div>Total</div>
          <div>{formatPrice(total)}</div>
        </div>
        <div>
          <Button variant='filled' onClick={handleClick} disabled={items.length < 1}>
            Go to Checkout
          </Button>
        </div>
      </div>
    </>
  )
}
