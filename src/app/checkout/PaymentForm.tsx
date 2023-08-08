'use client'

import { ReactElement } from 'react'
import { PaymentElement } from '@stripe/react-stripe-js'
import Button from '~/components/shared/Button'

export default function PaymentForm (): ReactElement {
  return (
    <form>
      <PaymentElement className='w-full' />
      <Button variant='filled' type='submit'>Submit</Button>
    </form>
  )
}
