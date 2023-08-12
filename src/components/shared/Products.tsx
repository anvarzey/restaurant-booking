'use client'

import { ReactElement } from 'react'
import useSWR from 'swr'
import Product from '~/components/shared/Product'
import Skeleton from './Skeleton'
import type { Product as IProduct } from '@prisma/client'

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Products ({ searchParams }: IProps): ReactElement {
  let url = '/api/menu'
  if (searchParams !== undefined) {
    const keys = Object.keys(searchParams)
    const values = Object.values(searchParams) as string[]
    url += `?${keys[0]}=` + values[0]
  }

  const { data, error, isLoading } = useSWR(url)

  return (
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
                    data?.map((product: IProduct) => (
                      <Product key={product.id} product={product} />
                    ))
                  }
                </>)
        }
      </ul>
    </div>
  )
}
