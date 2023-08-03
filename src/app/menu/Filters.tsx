'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { ReactElement } from 'react'

interface IProps {
  page: string
}

export default function Filters ({ page }: IProps): ReactElement {
  const searchParams = useSearchParams()
  const categories = [
    'Beers',
    'Pizzas',
    'Burgers',
    'Desserts'
  ]

  return (

    <div className='bg-white h-fit flex flex-col gap-3 border border-neutral-700 rounded-xl px-4 pt-4 pb-6 lg:w-1/4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>Filter by category</h3>
        <Link href='/menu' className='text-xs font-bold text-primary'>
          Reset Filters
        </Link>
      </div>
      <ul className='flex flex-col gap-1'>
        {
          categories.map((cat, i) => {
            const categoryPath = `/${page}?category=${cat.toLowerCase()}`
            const isActive = searchParams.get('category') === cat.toLowerCase()
            return (
              <li key={i}>
                <Link href={categoryPath} className={isActive ? 'font-bold text-primary' : ''}>
                  {cat}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
