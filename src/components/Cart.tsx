import { ReactElement } from 'react'
import useCartStore from '~/lib/zustand/store'
import CartItem from './CartItem'

export default function Cart (): ReactElement {
  const items = useCartStore(state => state.items)

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          items.map((item, i) => (
            <CartItem key={i} item={item} />
          ))
        }
      </ul>
    </div>
  )
}
