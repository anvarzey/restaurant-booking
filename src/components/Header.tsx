'use client'

import { ReactElement, useState } from 'react'
import { usePathname } from 'next/navigation'
import { artifika } from '~/utils/fonts'
import Link from 'next/link'
import Button from './Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { RiUser5Line } from 'react-icons/ri'

export default function Header (): ReactElement {
  const { data: session, status } = useSession()
  const [openOptions, setOpenOptions] = useState(false)
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

  const handleSignIn = async (): Promise<void> => {
    await signIn()
  }

  const handleSignOut = async (): Promise<void> => {
    await signOut()
  }

  const handleOpenOptions = (): void => {
    setOpenOptions(prev => !prev)
  }

  return (
    <header className='absolute top-0 left-0 w-full lg:px-20 lg:py-4'>
      <div className='flex items-center justify-between border-b border-neutral-300 lg:pb-4'>
        <div className={`text-3xl ${artifika.className}`}>LOGO</div>
        <nav>
          <ul className='flex items-center gap-3'>
            {
              links.map((link, i) => {
                const isActive = pathname === link.path
                return (
                  <li key={i}>
                    <Link href={link.path} className={`flex flex-col items-center ${isActive ? 'mb-2 font-semibold text-primary' : 'text-neutral-500'}`}>
                      <div>{link.name}</div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </nav>
        <div>
          {
            status === 'authenticated'
              ? (
                <div className='relative min-w-[6rem]'>
                  <button className='py-1 rounded-xl flex items-center gap-2' onClick={handleOpenOptions}>
                    <div className='h-6 w-6'>
                      <RiUser5Line className='h-full w-auto' />
                    </div>
                    <div>{session.user?.name}</div>
                  </button>
                  <ul className={`${openOptions ? 'flex' : 'hidden'} absolute rounded-b-xl bg-white p-2 border border-neutral-700 flex-col top-[120%] right-0 w-full`}>
                    <li>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                  </ul>

                </div>)
              : (
                <Button variant='outline' onClick={handleSignIn}>
                  Sign In
                </Button>)
          }
        </div>
      </div>
    </header>
  )
}
