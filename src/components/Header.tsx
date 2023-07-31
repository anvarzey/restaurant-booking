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
    <header className='lg:px-20 lg:py-4'>
      <div className='flex items-center justify-between border-b border-neutral-300 lg:pb-4'>
        <div className={`text-3xl ${artifika.className}`}>LOGO</div>
        <nav>
          <ul className='flex items-center gap-3'>
            {
              links.map((link, i) => {
                const isActive = pathname === link.path
                return (
                  <li key={i}>
                    <Link href={link.path} className={`flex flex-col items-center ${isActive ? 'mb-2 font-semibold' : 'text-neutral-500'}`}>
                      <div>{link.name}</div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </nav>
        <div>
          <button className='px-3 py-1 border border-neutral-600 rounded-xl font-light'>
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
