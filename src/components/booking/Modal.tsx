import { ReactElement } from 'react'
import Button from '../shared/Button'
import { artifika } from '~/utils/fonts'

interface IProps {
  status: string
  message: string
  handleReset: () => void
}

export default function Modal ({ status, message, handleReset }: IProps): ReactElement {
  return (
    <div className='h-screen w-screen flex items-center justify-center absolute inset-0 bg-black/20 overflow-hidden'>
      <div className='bg-white rounded-xl w-3/5 h-3/5 p-4 flex flex-col items-center justify-around'>
        <div className={`text-2xl ${status === 'success' ? 'text-green-800' : 'text-primary'} ${artifika.className}`}>
          {
            status === 'success'
              ? 'Your booking has been successfully made!'
              : (
                <div>
                  <div className='text-center'>An error has been occurred:</div>
                  <div className='text-center'>Please try again</div>
                </div>)
          }
        </div>
        <div className='max-w-[10rem]'>
          {
            status === 'success'
              ? (
                <Button variant='outline' link href='/'>
                  Return to Home
                </Button>)
              : (
                <Button variant='outline' onClick={() => handleReset()}>
                  Try Again
                </Button>)
          }
        </div>
      </div>
    </div>
  )
}
