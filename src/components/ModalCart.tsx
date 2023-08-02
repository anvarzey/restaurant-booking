'use client'

import Image from 'next/image'
import { ReactElement, useEffect, useState } from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { VscChromeClose } from 'react-icons/vsc'
// import useCartStore from '~/lib/zustand/store'
// import { shallow } from 'zustand/shallow'
import { artifika } from '~/utils/fonts'
import formatPrice from '~/utils/formatPrice'
// import dynamic from 'next/dynamic'

// const useCartStore = dynamic(async () => await import('~/lib/zustand/store'), { ssr: false })

export default function ModalCart (): ReactElement {
  // const [values, setValues] = { items: [], subtotal: 0, total: 0 }
  const [isClient, setIsClient] = useState(false)
  // const { items, subtotal, total } = useCartStore(state => ({ items: state.items, subtotal: state.subtotal, total: state.total }), shallow)
  // const reset = useCartStore(state => state.reset)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (): void => {
    setIsOpen(true)
  }

  const handleClose = (): void => {
    setIsOpen(false)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div className='flex justify-end lg:px-20'>
        <button className='h-6 w-6' onClick={handleOpen}>
          <HiOutlinePencilSquare className='h-full w-auto' />
        </button>
      </div>
      <div className={`relative z-10 overflow-hidden ${isOpen ? '' : 'hidden'}`} role='dialog'>
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? '' : 'hidden'}`} />
        <div className='fixed bg-white top-0 right-0 h-screen w-1/4 p-4'>
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
                items.length >= 1 &&
                isClient
                ? items.map((item, i) => (
                  <li key={i} className='flex items-center gap-4'>
                    <div className='relative h-20 w-20'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className='object-contain'
                      />
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
          <button className='w-full py-2 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 transition-all ease-in-out duration-75'>Book your seat</button>
        </div>
      </div>
    </>
  )
}
