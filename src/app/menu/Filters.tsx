'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { ReactElement } from 'react'

export default function Filters (): ReactElement {
  const searchParams = useSearchParams()
  const categories = [
    'Beers',
    'Pizzas',
    'Burgers',
    'Desserts'
  ]

  return (
    <div className='flex flex-col pe-8 lg:w-1/4'>
      <div className='flex items-center justify-between'>
        <div>Filter by category</div>
        <Link href='/menu' className='text-sm font-bold'>
          Reset Filters
        </Link>
      </div>
      <ul className='flex flex-col'>
        {
          categories.map((cat, i) => {
            const categoryPath = `/menu?category=${cat.toLowerCase()}`
            const isActive = searchParams.get('category') === cat.toLowerCase()

            return (
              <li key={i}>
                <Link href={categoryPath} className={isActive ? 'font-bold' : ''}>
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
