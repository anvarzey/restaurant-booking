import Link from 'next/link'
import { ReactElement } from 'react'
import { artifika } from '~/utils/fonts'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import UploadButton from './UploadButton'

export default async function Home (): Promise<ReactElement> {
  return (
    <>
      <Header />
      <UploadButton />
      <main className='min-h-screen'>
        <div className='flex flex-col lg:px-20'>
          <h1 className={`flex flex-col w-full text-8xl ${artifika.className}`}>
            <div className='self-start'>Authentic</div>
            <div className='self-center'>Food</div>
            <div className='self-end'>Dishes</div>
          </h1>
          <div className='self-end flex justify-around border-t border-r p-5 lg:w-3/4'>
            <div className='flex flex-col gap-4'>
              <h3 className='font-semibold text-lg'>
                Find your favourite beer
              </h3>
              <p>
                Search for all our most famous beers and more
              </p>
            </div>
            <div className='flex items-center'>
              <Link href='/menu' className='h-full px-10 flex items-center bg-neutral-900 text-neutral-100 rounded-full'>
                Explore now
              </Link>
            </div>
          </div>
          <div className='flex-flex-col w-32 h-40'>
            <div className='content-[""] border rounded-t-2xl h-1/4' />
            <div className='content-[""] border-x h-1/2' />
            <div className='content-[""] border rounded-b-2xl h-1/4' />
          </div>
        </div>
        <div className='bg-c-green h-screen'>
          <div className='lg:px-20'>
            <div className='w-1/2'>
              <h2 className={`text-4xl ${artifika.className}`}>
                Where people who love beer & ham meet together
              </h2>
              <p className='text-neutral-800'>
                If ham is good for family, beer is good for your mood.
              </p>
            </div>
          </div>
        </div>
        <div className='h-screen'>
          <div className='lg:px20'>
            <div>
              <ul className='flex items-center justify-between'>
                <li>Pick a date</li>
                <li>Pick the time</li>
                <li>Pre Order your food with 10% off</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='h-screen'>
          <div className='lg:px-20'>
            <h2>Most Popular Beers</h2>
          </div>
        </div>
        <div className=''>
          <div className='lg:px-20'>
            <h2>Suscribe to our newsletter</h2>
          </div>
        </div>
      </main>
      <Footer />
    </>

  )
}
