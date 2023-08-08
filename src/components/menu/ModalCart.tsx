'use client'

import Image from 'next/image'
import {
  ReactElement,
  useState
} from 'react'
import { artifika } from '~/utils/fonts'
import Button from '../shared/Button'
import { shallow } from 'zustand/shallow'
import { BiSolidMinusCircle } from 'react-icons/bi'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { VscChromeClose } from 'react-icons/vsc'
import useCartStore from '~/lib/zustand/store'
import formatPrice from '~/utils/formatPrice'
import { useRouter } from 'next/navigation'

export default function ModalCart (): ReactElement {
  const { items, subtotal, total, totalQuantity } = useCartStore(state => ({ items: state.items, subtotal: state.subtotal, total: state.total, totalQuantity: state.totalQuantity }), shallow)
  const reset = useCartStore(state => state.reset)
  const remove = useCartStore(state => state.remove)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleOpen = (): void => {
    setIsOpen(true)
  }

  const handleClose = (): void => {
    setIsOpen(false)
  }

  const handleCheckout = async (): Promise<void> => {
    const productsList = items.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    })

    const res = await fetch('/api/checkout', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(productsList)
    })
      .then(async (res) => await res.json())
      .catch(e => e)

    if (res.url !== undefined) {
      await router.push(res.url)
    }
  }

  return (
    <>
      <div className='flex justify-end lg:px-2 lg:pb-16'>
        <div className='h-8 relative'>
          <button className='h-6 w-6' onClick={handleOpen}>
            <HiOutlinePencilSquare className='h-full w-auto' />
          </button>
          <div className='text-xs py-1 px-2 bg-primary text-white rounded-full absolute -top-3.5 -left-5 font-bold'>{totalQuantity}</div>
        </div>
      </div>
      <div className={`relative z-10 overflow-hidden ${isOpen ? '' : 'hidden'}`} role='dialog'>
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? '' : 'hidden'}`} />
        <div className='fixed bg-white top-0 right-0 h-screen w-2/6 p-4'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className={`text-3xl ${artifika.className}`}>Cart</h2>
            <button className='h-6 w-6' onClick={handleClose}>
              <VscChromeClose className='h-full w-auto' />
            </button>
          </div>
          <div>
            <button onClick={reset}>
              Clear Order
            </button>
          </div>
          <ul className='mb-8'>
            {
              items !== undefined &&
                items.length >= 1
                ? items.map((item, i) => (
                  <li key={i} className='flex items-center gap-4'>
                    <div className='flex items-center'>
                      <button className='h-4 w-4' onClick={() => remove(item.id)}>
                        <BiSolidMinusCircle className='h-full w-auto text-primary' />
                      </button>
                      <div className='relative h-20 w-20'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </div>
                    <div className={`grow ${artifika.className}`}>
                      {item.name}
                    </div>
                    <div className=''>
                      x
                      {item.quantity}
                    </div>
                  </li>
                ))

                : (
                  <li>
                    No products
                  </li>)
            }
          </ul>
          <div className='flex items-center justify-between'>
            <div>Subtotal</div>
            <div>{formatPrice(subtotal)}</div>
          </div>
          <div className='flex items-center justify-between'>
            <div>Total</div>
            <div>{formatPrice(total)}</div>
          </div>
          <Button variant='outline' onClick={handleCheckout} disabled={items.length < 1}>
            Checkout & Book your seat
          </Button>
        </div>
      </div>
    </>
  )
}
