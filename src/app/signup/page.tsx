import { ReactElement } from 'react'
import SignupForm from './SignupForm'

export default function page (): ReactElement {
  return (
    <div>
      <h2>Signup</h2>
      <div className='w-2/4 mx-auto'>
        <SignupForm />
      </div>
    </div>
  )
}
