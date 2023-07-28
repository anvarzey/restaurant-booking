import { ReactElement } from 'react'
import { prisma } from '~/lib/prisma'

export default async function page (): Promise<ReactElement> {
  const menuITems = await prisma.menuItem.findMany()
  return (
    <div>
      <ul className='w-full'>
        {
          menuITems.map(menuItem => (
            <li key={menuItem.id} className='w-full flex items-center justify-between'>
              <span>
                {menuItem.name}
              </span>
              <span>
                {menuItem.category}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
