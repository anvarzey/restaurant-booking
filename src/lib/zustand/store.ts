import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Item {
  id: string
  name: string
  image: string
  quantity: number
  price: number
  priceWithDiscount: number
}

interface CartState {
  items: Item[]
  subtotal: number
  total: number
  totalQuantity: number
  add: (item: Item) => void
  update: (id: string, quantity: number) => void
  reset: () => void
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        subtotal: 0,
        total: 0,
        totalQuantity: 0,
        add: (item) => {
          const cartItems = get().items
          const updated = cartItems.findIndex(cartItem => cartItem.id === item.id)
          if (updated >= 0) {
            cartItems[updated].quantity += item.quantity
          } else {
            cartItems.push(item)
          }
          const subtotal = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
          const total = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.priceWithDiscount), 0)
          const totalQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
          set((state) => ({ items: cartItems, subtotal, total, totalQuantity }))
        },
        update: (id, quantity) => {
          const cartItems = get().items
          const updated = cartItems.findIndex(cartItem => cartItem.id === id)
          if (updated !== undefined) {
            // updated.quantity = quantity
            // const updatedCartItems = [...cartItems, updated]
            cartItems[updated].quantity = quantity
            const subtotal = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
            const total = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.priceWithDiscount), 0)
            const totalQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)

            set((state) => ({ items: cartItems, subtotal, total, totalQuantity }))
          }
        },
        reset: () => {
          set(state => ({ items: [], subtotal: 0, total: 0, totalQuantity: 0 }))
        }
      }),
      {
        name: 'cart-storage'
      }
    )
  )
)

export default useCartStore
