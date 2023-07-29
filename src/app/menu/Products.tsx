'use client'

import { ReactElement } from 'react'
import useSWR from 'swr'
import Product from '~/components/Product'

export default function Products ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): ReactElement {
  let url = '/api/menu'
  if (searchParams !== undefined) {
    const keys = Object.keys(searchParams)
    const values = Object.values(searchParams) as string[]
    url += `?${keys[0]}=` + values[0]
  }

  console.log(searchParams)
  const { data, error, isLoading } = useSWR(url)

  console.log(data)

  return (
    <div className='grow'>
      {
        error !== undefined
          ? <div>An error has been occurred</div>
          : isLoading
            ? <div>Loading...</div>
            : (
              <ul className='custom-grid'>
                {
                  data?.map((product, i) => (
                    <Product key={i} product={product} />
                  ))
                }
              </ul>)
      }
    </div>
  )
}
