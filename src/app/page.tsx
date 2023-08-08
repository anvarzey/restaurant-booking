import { ReactElement } from 'react'
import { artifika } from '~/utils/fonts'
import Header from '~/components/shared/Header'
import Footer from '~/components/shared/Footer'
import Image from 'next/image'
import Carrousel from '~/components/home/Carrousel'
import { AiOutlineArrowRight } from 'react-icons/ai'

export default async function Home (): Promise<ReactElement> {
  const steps = [
    {
      id: 0,
      title: 'Pick a date & time',
      subtitle: 'Choose the date & time of your preference'
    },
    {
      id: 1,
      title: 'Pre Order your food with 10% off',
      subtitle: 'You can pre order your food & beers of your preference. This step is OPTIONAL, you can order normally in our restaurant.'
    },
    {
      id: 2,
      title: 'Come and enjoy',
      subtitle: 'Come at the time of your booking and have a nice time.'
    }
  ]
  return (
    <>
      <Header />
      <main className='bg-neutral-100'>
        <div className='flex items-center justify-between lg:pt-10 lg:px-20 h-screen'>
          <div>
            <div className={`text-9xl mb-4 ${artifika.className}`}>
              <p>Authentic</p>
              <p>Artisan</p>
              <p>Beer</p>
            </div>
            <p className='text-xl py-1 '>
              Have a nice time with your friends and <span className='border-b-2 border-primary font-medium'>keep up the beers 🍻</span>
            </p>
          </div>
          <div className='relative h-96 w-96 px-8 border-2 border-neutral-700 rotate-45 rounded-xl bg-neutral-50 shadow-md'>
            <Image
              src='https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/lager_g8dmrj.png'
              alt='Beer'
              fill
              className='object-cover h-full p-8 -rotate-45 drop-shadow-xl'
            />
          </div>
        </div>
        <div className='bg-c-green h-screen flex items-center lg:px-20'>
          <div className='flex items-center justify-between h-3/4 w-full'>
            <div className='w-1/2'>
              <h2 className={`text-4xl mb-8 ${artifika.className}`}>
                Where people who love beer & ham meet together
              </h2>
              <p className='text-neutral-800 tracking-wide leading-7'>
                If ham is good for family, beer is good for your mood. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos similique iusto sint numquam explicabo quae?
              </p>
            </div>
            <div className='h-96 w-80 relative border  border-neutral-200 rounded-xl shadow-2xl scale-105'>
              <Image
                src='https://res.cloudinary.com/dfyxdowwb/image/upload/q_auto:best/v1690652525/restaurant-booking/pizzas/700-700-masri_pkrdom_jhnhyw.webp'
                alt='Photo'
                fill
                className='object-cover h-full rounded-xl'
              />
            </div>
          </div>
        </div>
        <div className='h-[75vh] flex items-center'>
          <div className='lg:px-20'>
            <div>
              <ul className='flex items-center justify-between py-8'>
                {
                  steps.map(step => (
                    <li key={step.id} className='w-1/6 flex flex-col items-center'>
                      <div className={step.id === 1 ? 'font-semibold text-center' : 'font-medium'}>{step.title}</div>
                    </li>
                  ))
                }
              </ul>
              <div className='border-b border-neutral-700 w-10/12 mx-auto relative'>
                <div className='absolute top-1/2 -translate-y-1/2'>
                  <span className='relative flex h-3 w-3 -top-full'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' />
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-primary' />
                  </span>
                </div>
                <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                  <span className='relative flex h-3 w-3 -top-full'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' />
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-primary' />
                  </span>
                </div>
                <div className='absolute top-1/2 -translate-y-1/2 right-0'>
                  <span className='relative flex h-3 w-3 -top-full'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' />
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-primary' />
                  </span>
                </div>

              </div>
              <ul className='flex items-start justify-between py-8 relative'>
                {
                  steps.map(step => (
                    <li key={step.id} className={step.id === 1 ? 'w-1/5' : 'w-1/6'}>
                      <p className={`text-lg text-center ${step.id === 1 ? 'font-semibold' : 'font-medium'}`}>{step.subtitle}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='bg-c-green h-screen'>
          <div className='lg:px-20 h-full flex flex-col justify-center gap-16'>
            <div>
              <h2 className={`text-5xl text-center mb-4 ${artifika.className}`}>Most Popular Beers</h2>
              <p className='text-center'>Our artisanal beers are famous for its remarkable taste</p>
            </div>
            <Carrousel />
          </div>
        </div>
        <div className='h-[80vh]'>
          <div className='h-full flex items-center justify-between lg:px-20 lg:py-16'>
            <div className='relative w-1/3 h-full flex justify-center shadow-lg rounded-xl'>
              <Image
                src='https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/alfajor-sablee_tfmzmk.webp'
                alt='Alfajorcito'
                fill
                className='object-cover rounded-xl'
              />
            </div>
            <div className='w-1/2 flex flex-col justify-around h-3/4'>
              <div className='flex flex-col justify-between'>
                <h2 className={`text-5xl mb-4 ${artifika.className}`}>
                  Subscribe & Get Latest News
                </h2>
                <p>
                  Be the first to notice our Limited-Time Offers & get exclusive promos
                </p>
              </div>
              <div className='flex items-center'>
                <input type='text' placeholder='Enter your email address' className='grow peer outline-none bg-transparent text-lg py-4 px-3 border-2 border-t-transparent border-s-transparent border-e-0 border-neutral-700 focus:border-primary focus:rounded-s-xl' />
                <button className='h-full w-12 animate-fill-right border-2 border-neutral-700 rounded-r-xl peer-focus:border-primary peer-focus:rounded-e-xl'>
                  <AiOutlineArrowRight className='h-full w-auto py-4 px-2' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>

  )
}
