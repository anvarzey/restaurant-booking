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
import useOrderStore from '~/lib/zustand/store'
import formatPrice from '~/utils/formatPrice'

export default function ModalOrder (): ReactElement {
  const { items, subtotal, total, totalQuantity } = useOrderStore((state) => ({ items: state.items, subtotal: state.subtotal, total: state.total, totalQuantity: state.totalQuantity }), shallow)
  const reset = useOrderStore(state => state.reset)
  const remove = useOrderStore(state => state.remove)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (): void => {
    setIsOpen(true)
  }

  const handleClose = (): void => {
    setIsOpen(false)
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
            <h2 className={`text-3xl ${artifika.className}`}>Order</h2>
            <button className='h-6 w-6 hover:text-primary' onClick={handleClose}>
              <VscChromeClose className='h-full w-auto' />
            </button>
          </div>
          <div className='flex justify-end'>
            <button onClick={reset} className='italic hover:text-primary'>
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
                  <li className='pt-6 font-bold'>
                    No products
                  </li>)
            }
          </ul>
          <div className='flex items-center justify-between py-2'>
            <div>Subtotal</div>
            <div>{formatPrice(subtotal)}</div>
          </div>
          <div className='flex items-center justify-between pb-4 text-lg'>
            <div>Total</div>
            <div>{formatPrice(total)}</div>
          </div>
          <Button link variant='outline' href='/booking' disabled={items.length < 1}>
            Book your seat & Checkout
          </Button>
        </div>
      </div>
    </>
  )
}
