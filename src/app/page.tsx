import Link from 'next/link'
import { ReactElement } from 'react'
import { artifika } from '~/utils/fonts'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Image from 'next/image'
import Frame from '~/components/Frame'
import Carrousel from '~/components/Carrousel'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { VscDebugBreakpointFunction } from 'react-icons/vsc'

export default async function Home (): Promise<ReactElement> {
  const steps = [
    {
      title: 'Pick a date & time',
      subtitle: 'Choose the date & time of your preference'
    },
    {
      title: 'Pre Order your food with 10% off',
      subtitle: 'You can pre order your food & beers of your preference. This step is OPTIONAL, you can order normally in our restaurant.'
    },
    {
      title: 'Come and enjoy',
      subtitle: 'Come at the time of your booking and have a nice time.'
    }
  ]
  return (
    <>
      <Header />
      <main className=''>
        <div className='grid grid-cols-6 grid-rows-4 lg:py-8 lg:px-20 min-h-[85vh]'>
          <div className={`row-start-1 self-start text-9xl ${artifika.className}`}>
            Authentic
          </div>
          <div className={`row-start-2 col-start-3 col-span-2 self-center flex items-center justify-center text-9xl ${artifika.className}`}>
            Food
          </div>
          <div className={`row-start-3 col-start-4 col-span-3 self-end flex items-center gap-4 justify-end text-9xl ${artifika.className}`}>
            <div className='relative h-24 w-24 rounded-full border-2 border-neutral-800'>
              <Image src='https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/lager_g8dmrj.png' alt='Beer' fill className='object-contain' />
            </div>
            <div>Dishes</div>
          </div>
          <div className='row-start-4 col-start-3 col-span-4 self-end flex justify-around border-t border-r p-5 lg:w-full'>
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
          <Frame className='row-start-2 row-span-3 col-start-1 col-span-2 lg:w-3/4'>
            <Image src='https://res.cloudinary.com/dfyxdowwb/image/upload/q_auto:best/v1690652525/restaurant-booking/pizzas/700-700-masri_pkrdom_jhnhyw.webp' alt='Photo' fill className='object-contain' />
          </Frame>
          <Frame className='row-start-1 row-span-2 col-start-5 col-span-2 relative left-full -translate-x-full'>
            <Image src='https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/340-300-mega-power-bacon-doble_yjtg3z_fyzwfh.jpg' alt='Photo' fill className='object-contain w-1/2' />
          </Frame>
        </div>
        <div className='bg-c-green h-screen flex items-center lg:px-20'>
          <div className='flex items-center h-3/4 w-full'>
            <div className='w-1/2'>
              <h2 className={`text-4xl mb-8 ${artifika.className}`}>
                Where people who love beer & ham meet together
              </h2>
              <p className='text-neutral-800 tracking-wide leading-7'>
                If ham is good for family, beer is good for your mood. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos similique iusto sint numquam explicabo quae?
              </p>
            </div>
            <div className='h-full w-1/2 flex justify-end'>
              <Frame className='lg:w-3/4'>
                <div className='relative h-full'>
                  <div className='absolute h-[175%] w-1/2 top-8 left-[1rem] origin-top-left rotate-[15deg]'>
                    <Image
                      src='https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/brownie_cv3l6k.webp'
                      alt='Photo'
                      fill
                      className='object-contain h-full'
                    />
                  </div>
                  <div className='absolute h-[175%] w-1/2 left-1/4 origin-top-left rotate-[5deg]'>
                    <Image
                      src='https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/brownie_cv3l6k.webp'
                      alt='Photo'
                      fill
                      className='object-contain h-full'
                    />
                  </div>
                  <div className='absolute h-[175%] w-1/2 -top-8 left-1/4 origin-top-left -rotate-[15deg]'>
                    <Image
                      src='https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/brownie_cv3l6k.webp'
                      alt='Photo'
                      fill
                      className='object-contain h-full'
                    />
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </div>
        <div className='h-screen'>
          <div className='lg:px-20'>
            <div>
              <ul className='flex items-center justify-between border-b border-neutral-800 py-8'>
                {
                  steps.map((step, i) => (
                    <li key={i} className='w-1/6'>
                      <div className={i === 1 ? 'font-semibold' : ''}>{step.title}</div>
                      <div className='h-5 w-5 '>
                        <VscDebugBreakpointFunction className='rotate-180' />
                      </div>
                    </li>
                  ))
                }
              </ul>
              <ul className='flex items-start justify-between py-8'>
                {
                  steps.map((step, i) => (
                    <li key={i} className='w-1/6'>
                      <p className={i === 1 ? 'font-semibold text-lg' : ''}>{step.subtitle}</p>
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
          <div className='h-full flex items-center lg:px-20 lg:py-16'>
            <div className='w-1/2 h-full flex justify-center'>
              <Frame>
                <Image
                  src='https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/alfajor-sablee_tfmzmk.webp'
                  alt='Alfajorcito'
                  fill
                  className='object-contain'
                />
              </Frame>
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
              <div className='flex items-center gap-4 border-b-2 border-neutral-800 py-4'>
                <input type='text' placeholder='Enter your email address' className='grow outline-none' />
                <button className='h-8 w-8'>
                  <AiOutlineArrowRight className='h-full w-auto' />
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
