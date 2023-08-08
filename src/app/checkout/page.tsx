import { ReactElement } from 'react'
import PaymentForm from './PaymentForm'

export default function page (): ReactElement {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-3/5'>
        <PaymentForm />
      </div>
    </div>
  )
}
