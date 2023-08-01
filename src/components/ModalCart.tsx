'use client'

import { ReactElement, useEffect, useState } from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { VscChromeClose } from 'react-icons/vsc'
import useCartStore from '~/lib/zustand/store'
import { artifika } from '~/utils/fonts'

export default function ModalCart (): ReactElement {
  const items = useCartStore(state => state.items)
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

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
          <ul className='mb-8'>
            {
              items !== undefined &&
                items.length >= 1 &&
                isClient
                ? items.map((item, i) => (
                  <li key={i}>
                    {item.quantity}
                  </li>
                ))

                : (
                  <li>
                    No products
                  </li>)
            }
          </ul>
          <button className='w-full py-2 border-2 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 transition-all ease-in-out duration-75'>Book your seat</button>
        </div>
      </div>
    </>
  )
}
