'use client'

import { ReactElement } from 'react'
import useSWR from 'swr'
import Product from '~/components/Product'

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
