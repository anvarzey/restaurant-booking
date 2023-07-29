import { ReactElement } from 'react'
import { prisma } from '~/lib/prisma'

export default async function page (): Promise<ReactElement> {
  const products = await prisma.product.findMany()
  return (
    <div className='grow'>
      <ul className='w-full'>
        {
          products.map(product => (
            <li key={product.id} className='w-full flex items-center justify-between'>
              <span>
                {product.name}
              </span>
              <span>
                {product.category}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
