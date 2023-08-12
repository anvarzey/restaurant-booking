import { ReactElement } from 'react'
import Button from '~/components/shared/Button'
import { artifika } from '~/utils/fonts'

export default function page (): ReactElement {
  return (
    <div className='h-screen overflow-hidden flex flex-col items-center justify-center gap-16'>
      <h2 className={`text-2xl text-center ${artifika.className}`}>An error has occurred when processing your payment</h2>
      <div className='flex items-center justify-center'>
        <Button link variant='filled' href='/'>
          Return to Home
        </Button>
      </div>
    </div>
  )
}
