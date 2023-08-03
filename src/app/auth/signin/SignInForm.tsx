'use client'

import { signIn } from 'next-auth/react'
import { ChangeEvent, ReactElement, SyntheticEvent, useState } from 'react'
import Button from '~/components/Button'

export default function SignInForm (): ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault()
    await signIn('credentials', { email, password, callbackUrl: 'http://localhost:3000' })
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='grow flex flex-col justify-around'
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your email</label>
          <input onChange={handleEmail} name='email' type='text' placeholder='user@email.com' className='p-2 border-b border-neutral-700' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your password</label>
          <input onChange={handlePassword} name='password' type='password' className='p-2 border-b border-neutral-700' />
        </div>
      </div>
      <div className=''>
        <Button variant='filled' type='submit'>Sign In</Button>
      </div>
    </form>
  )
}
