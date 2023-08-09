'use client'

import { ReactElement } from 'react'
import useCartStore from '~/lib/zustand/store'
import CartItem from './CartItem'
import { artifika } from '~/utils/fonts'
import Button from '../shared/Button'
import formatPrice from '~/utils/formatPrice'
import { handleCheckout } from '~/services/checkout'
import { useRouter } from 'next/navigation'

export default function Cart (): ReactElement {
  const { items, total } = useCartStore(state => ({ items: state.items, total: state.total }))
  const router = useRouter()

  const handleClick = async (): Promise<void> => {
    const url = await handleCheckout(items)

    await router.push(url)
  }

  return (
    <div className='bg-white rounded-xl px-4 pt-3 pb-6 border border-neutral-700 w-1/4 h-fit'>
      <h4 className={`text-2xl pb-4 ${artifika.className}`}>Cart</h4>
      <ul className='pb-8'>
        {
          items.map((item, i) => (
            <CartItem key={i} item={item} />
          ))
        }
      </ul>
      <div className='flex items-center justify-between pb-4'>
        <div>Total</div>
        <div>{formatPrice(total)}</div>
      </div>
      <div>
        <Button href='/checkout' variant='filled' onClick={handleClick} disabled={items.length < 1}>
          Go to Checkout
        </Button>
      </div>
    </div>
  )
}
