import Image from 'next/image'
import { ReactElement } from 'react'
import { artifika } from '~/utils/fonts'

export default function Carrousel (): ReactElement {
  const items = [
    {
      name: 'Jamonera',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
    },
    {
      name: 'Jamonera',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
    },
    {
      name: 'Jamonera',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
    }
  ]
  return (
    <ul className='flex items-center gap-12 h-1/2'>
      {
        items.map((item, i) => (
          <li key={i} className='h-full w-1/4 flex flex-col gap-4 border border-neutral-600 rounded-xl'>
            <div className='relative h-3/4 py-20 bg-white rounded-t-xl'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className='object-contain'
              />
            </div>
            <div className='px-4 flex items-center justify-between gap-2'>
              <div className={`text-xl ${artifika.className}`}>
                {item.name}
              </div>
              <button className='bg-primary text-white rounded-xl py-1 px-2'>Pre Order Now</button>
            </div>
          </li>))
      }
    </ul>
  )
}
