import Link from 'next/link'
import { ReactElement } from 'react'

export default function Sidebar (): ReactElement {
  const pages = [
    {
      link: '/admin',
      title: 'Dashboard'
    },
    {
      link: '/admin/bookings',
      title: 'Bookings'
    },
    {
      link: '/admin/menu',
      title: 'Menu'
    },
    {
      link: '/admin/hours',
      title: 'Manage Opening Hours'
    }
  ]
  return (
    <div className='bg-slate-500 h-full'>
      <nav>
        <ul className='flex flex-col'>
          {
            pages.map(page => (
              <Link href={page.link} key={page.title}>
                {page.title}
              </Link>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}
