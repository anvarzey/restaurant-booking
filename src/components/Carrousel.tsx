import Image from 'next/image'
import { ReactElement } from 'react'
import { artifika } from '~/utils/fonts'

export default function Carrousel (): ReactElement {
  return (
    <ul className='flex items-center gap-12 h-1/2'>
      <li className='h-full w-1/4 flex flex-col gap-4'>
        <div className='relative h-3/4 border-2 border-neutral-500 py-20'>
          <Image
            src='https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
            alt='Jamonera'
            fill
            className='object-contain'
          />
        </div>
        <div>
          <div className={`text-xl ${artifika.className}`}>
            Jamonera
          </div>
        </div>
      </li>
      <li className='h-full w-1/4 flex flex-col gap-4'>
        <div className='relative h-3/4 border-2 border-neutral-500 py-20'>
          <Image
            src='https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
            alt='Jamonera'
            fill
            className='object-contain'
          />
        </div>
        <div>
          <div className={`text-xl ${artifika.className}`}>
            Jamonera
          </div>
        </div>
      </li>
      <li className='h-full w-1/4 flex flex-col gap-4'>
        <div className='relative h-3/4 border-2 border-neutral-500 py-20'>
          <Image
            src='https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
            alt='Jamonera'
            fill
            className='object-contain'
          />
        </div>
        <div>
          <div className={`text-xl ${artifika.className}`}>
            Jamonera
          </div>
        </div>
      </li>
    </ul>
  )
}
