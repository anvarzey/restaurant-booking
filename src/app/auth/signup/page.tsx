import { ReactElement } from 'react'
import { artifika } from '~/utils/fonts'
import SignupForm from './SignupForm'

export default function page (): ReactElement {
  return (
    <main className='h-screen flex items-center justify-center bg-neutral-100'>
      <div className='flex flex-col border border-neutral-700 rounded-xl py-6 px-4 w-1/3 h-[70vh] bg-white'>
        <h2 className={`text-5xl text-center ${artifika.className}`}>Signup</h2>
        <SignupForm />
      </div>
    </main>
  )
}
