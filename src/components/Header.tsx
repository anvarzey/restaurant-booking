'use client'

import { ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { artifika } from '~/utils/fonts'

export default function Header (): ReactElement {
  const pathname = usePathname()

  const links = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Menu',
      path: '/menu'
    },
    {
      name: 'Book Now',
      path: '/booking'
    }
  ]

  return (
    <header className='flex items-center justify-between lg:px-10 lg:py-4 border-b border-neutral-300'>
      <div className={artifika.className}>LOGO</div>
      <nav>
        <ul className='flex items-center gap-3'>
          {
            links.map((link, i) => {
              const isActive = pathname === link.path
              return (
                <li key={i}>
                  <Link href={link.path} className={`flex flex-col items-center ${isActive ? '' : 'text-neutral-500'}`}>
                    <div>{link.name}</div>
                    <div className={isActive ? 'text-2xl' : 'hidden'}>·</div>
                  </Link>

                </li>
              )
            })
          }
        </ul>
      </nav>
      <div>
        <button className='px-3 py-1 border border-neutral-600 rounded-xl font-semibold'>
          Sign In
        </button>
      </div>
    </header>
  )
}
