'use client'

import {
  ReactElement
} from 'react'
import useSWR from 'swr'
import Product from './Product'
import Cart from './Cart'
import { artifika } from '~/utils/fonts'

export default function WithPreOrder (): ReactElement {
  const { data, error, isLoading } = useSWR('/api/menu')

  return (
    <div>
      <h2 className={`text-center text-3xl pb-8 ${artifika.className}`}>PreOrder</h2>
      <div className='flex gap-4'>
        <div className='grow'>
          {
            error !== undefined
              ? <div>An error has been occurred</div>
              : isLoading
                ? <div>Loading...</div>
                : (
                  <ul className='custom-grid'>
                    {
                      data.map((product: any, i: number) => (
                        <Product product={product} key={i} />
                      ))
                    }
                  </ul>)
          }
        </div>
        <Cart />
      </div>
    </div>
  )
}
