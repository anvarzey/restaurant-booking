'use client'

import {
  ReactElement
} from 'react'
import useSWR from 'swr'
import Product from '../shared/Product'
import Cart from './Cart'
import { artifika } from '~/utils/fonts'
import Skeleton from '../shared/Skeleton'

export default function WithPreOrder (): ReactElement {
  const { data, error, isLoading } = useSWR('/api/menu')

  return (
    <div>
      <h2 className={`text-center text-3xl pb-8 ${artifika.className}`}>PreOrder</h2>
      <div className='flex gap-4'>
        <div className='grow'>
          <ul className='custom-grid'>
            {
              error !== undefined
                ? <div>An error has been occurred</div>
                : isLoading
                  ? (
                    <>
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </>)
                  : (
                    <>
                      {
                        data.map((product: any, i: number) => (
                          <Product product={product} key={i} />
                        ))
                      }
                    </>)
            }
          </ul>
        </div>
        <Cart />
      </div>
    </div>
  )
}
