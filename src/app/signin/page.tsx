import { ReactElement } from 'react'
import SigninForm from './SigninForm'

export default function page (): ReactElement {
  return (
    <div>
      <h1 className='text-center text-lg text-emerald-600 font-bold'>
        Sign in
      </h1>
      <div className='mx-auto w-1/2'>
        <SigninForm />
      </div>
    </div>
  )
}
