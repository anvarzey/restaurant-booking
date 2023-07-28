'use client'

import {
  ReactElement
} from 'react'
import useSWR from 'swr'
import useCartStore from '~/lib/zustand/store'
import MenuItem from './MenuItem'
import Cart from './Cart'

export default function WithPreOrder (): ReactElement {
  const { data, error, isLoading } = useSWR('/api/menu')
  const total = useCartStore(state => state.total)
  const reset = useCartStore(state => state.reset)

  return (
    <div>
      <h2>PreOrder</h2>
      {
        error !== undefined
          ? <div>An error has been occurred</div>
          : isLoading
            ? <div>Loading...</div>
            : (
              <ul className='custom-grid'>
                {
                  data.map((menuItem: any, i: number) => (
                    <MenuItem menuItem={menuItem} key={i} />
                  ))
                }
              </ul>)
      }
      <div>
        <Cart />
        <div className='flex items-center justify-around'>
          <div>Subtotal</div>
          <div>${total}</div>
        </div>
        <div>
          <button onClick={() => reset()}>Empty Cart</button>
        </div>
      </div>
    </div>
  )
}
