'use client'

import Image from 'next/image'
import { ReactElement, useState } from 'react'
import useCartStore from '~/lib/zustand/store'
import { artifika } from '~/utils/fonts'
import formatPrice from '~/utils/formatPrice'

interface IProps {
  product: {
    id: string
    name: string
    category: string
    image: string
    price: number
    priceWithDiscount: number
  }
}

export default function Product ({ product }: IProps): ReactElement {
  const [quant, setQuant] = useState(0)
  const add = useCartStore(state => state.add)
  const formattedPrice = formatPrice(product.price)
  const formattedPriceWithDiscount = formatPrice(product.priceWithDiscount)

  const handleClick = (): void => {
    add({
      id: product.id,
      quantity: quant,
      price: product.price,
      priceWithDiscount: product.priceWithDiscount
    })
  }

  return (
    <li className='border border-neutral-600 px-2 py-4 lg:px-4'>
      <div className='h-1/2 w-full relative flex justify-center'>
        {/* <img src={product.image} alt='Alter ego' /> */}
        <Image src={product.image} fill alt={product.name} className='object-contain' />
      </div>
      <div className='pt-2 flex flex-col gap-1'>
        <div className={`text-xl truncate ${artifika.className}`}>{product.name}</div>
        <div className='flex items-center justify-between'>
          <div>Category</div>
          <div>{product.category}</div>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            Price
          </div>
          <div className='flex items-end gap-2'>
            <span className='text-neutral-500 line-through'>{formattedPrice}</span>
            <span className='text-lg font-bold'>{formattedPriceWithDiscount}</span>
          </div>
        </div>
        <div className='flex justify-end'>
          <span className='text-sm'>10% OFF with Pre Order</span>
        </div>
        <div className='flex items-center justify-between gap-3 mt-3'>
          <select
            name='quantity'
            id='quantity'
            onChange={(e) => setQuant(Number(e.target.value))}
            className='cursor-pointer appearance-none px-6 py-1 bg-neutral-200 text-neutral-800 border border-neutral-800'
          >
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
          </select>
          <button
            onClick={handleClick}
            disabled={quant <= 0}
            className='w-full cursor-pointer py-1 bg-neutral-800 border border-neutral-800 text-neutral-100 disabled:opacity-50 disabled:cursor-default'
          >
            Add to cart
          </button>
        </div>
      </div>
    </li>
  )
}
