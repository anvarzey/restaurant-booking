'use client'

import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { artifika } from '~/utils/fonts'

export default function Carrousel (): ReactElement {
  const [current, setCurrent] = useState(0)
  const items = [
    {
      name: 'Jamonera',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png'
    },
    {
      name: 'Lager',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/lager_g8dmrj.png'
    },
    {
      name: 'Ipa',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/ipa_vtljwe.png'
    },
    {
      name: 'Non-Alcoholic Toast',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/0_0_tostada_gh87nd.png'
    },
    {
      name: '360',
      image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/360_jhfyt1.png'
    }
  ]
  return (
    <div className='overflow-hidden'>
      <ul
        className='flex items-center gap-12 h-96 snap-x snap-mandatory scroll-smooth mb-4'
        style={{ transform: `translateX(-${current * 100}%)`, transition: 'transform 0.75s ease-in' }}
      >
        {
          items.map((item, i) => (
            <li key={i} className='h-full w-1/4 flex flex-col gap-4 border border-neutral-600 rounded-xl snap-center shrink-0'>
              <div className='relative h-3/4 py-20 bg-white rounded-t-xl'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-contain'
                />
              </div>
              <div className='px-4 flex flex-col items-center justify-between gap-2'>
                <div className={`text-xl ${artifika.className}`}>
                  {item.name}
                </div>
                <button className='bg-primary text-white rounded-xl py-1 px-2'>Pre Order Now</button>
              </div>
            </li>))
        }
      </ul>
      <div className='flex items-center justify-center gap-3'>
        <div onClick={() => setCurrent(0)} className={`rounded-full h-4 w-4 content-[""] cursor-pointer ${current === 0 ? 'bg-primary' : 'bg-neutral-300'}`} />
        <div onClick={() => setCurrent(1)} className={`rounded-full h-4 w-4 content-[""] cursor-pointer ${current === 1 ? 'bg-primary' : 'bg-neutral-300'}`} />
      </div>
    </div>
  )
}
