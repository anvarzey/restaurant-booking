import { ReactElement } from 'react'
import BookingInfo from '~/components/checkout/BookingInfo'
import Button from '~/components/shared/Button'
import { artifika } from '~/utils/fonts'

export default function page (): ReactElement {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center gap-4 w-1/2 h-3/4'>
        <h2 className={`text-2xl ${artifika.className}`}>Your booking has been made succesfully !</h2>
        <BookingInfo />
        <div className='flex justify-center'>
          <Button variant='outline' link href='/'>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
