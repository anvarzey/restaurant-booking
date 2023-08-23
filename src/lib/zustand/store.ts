import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Item {
  id: string
  name: string
  image: string
  quantity: number
  price: number
  priceWithDiscount: number
}

export interface OrderState {
  items: Item[]
  subtotal: number
  total: number
  totalQuantity: number
  add: (item: Item) => void
  update: (id: string, quantity: number) => void
  remove: (id: string) => void
  reset: () => void
}

const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        subtotal: 0,
        total: 0,
        totalQuantity: 0,
        add: (item) => {
          const orderItems = get().items
          const updated = orderItems.findIndex(orderItem => orderItem.id === item.id)
          if (updated >= 0) {
            orderItems[updated].quantity += item.quantity
          } else {
            orderItems.push(item)
          }
          const subtotal = orderItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
          const total = orderItems.reduce((acc, curr) => acc + (curr.quantity * curr.priceWithDiscount), 0)
          const totalQuantity = orderItems.reduce((acc, curr) => acc + curr.quantity, 0)
          set((state) => ({ items: orderItems, subtotal, total, totalQuantity }))
        },
        update: (id, quantity) => {
          const orderItems = get().items
          const updated = orderItems.findIndex(orderItem => orderItem.id === id)
          if (updated !== undefined) {
            // updated.quantity = quantity
            // const updatedOrderItems = [...orderItems, updated]
            orderItems[updated].quantity = quantity
            const subtotal = orderItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
            const total = orderItems.reduce((acc, curr) => acc + (curr.quantity * curr.priceWithDiscount), 0)
            const totalQuantity = orderItems.reduce((acc, curr) => acc + curr.quantity, 0)

            set((state) => ({ items: orderItems, subtotal, total, totalQuantity }))
          }
        },
        remove: (id) => {
          const orderItems = get().items
          const updatedItems = orderItems.filter(orderItem => orderItem.id !== id)

          const subtotal = updatedItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
          const total = updatedItems.reduce((acc, curr) => acc + (curr.quantity * curr.priceWithDiscount), 0)
          const totalQuantity = updatedItems.reduce((acc, curr) => acc + curr.quantity, 0)

          set((state) => ({ items: updatedItems, subtotal, total, totalQuantity }))
        },
        reset: () => {
          set(state => ({ items: [], subtotal: 0, total: 0, totalQuantity: 0 }))
        }
      }),
      {
        name: 'order-storage'
      }
    )
  )
)

export default useOrderStore
