'use client'

import { signIn } from 'next-auth/react'
import { ReactElement } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Button from '~/components/shared/Button'

export default function SignInForm (): ReactElement {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const { email, password } = values
    console.log({ email, password })
    await signIn('credentials', { email, password, callbackUrl: 'http://localhost:3000' })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grow flex flex-col justify-around'
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your email</label>
          <input {...register('email')} name='email' type='text' placeholder='user@email.com' className='p-2 border-b border-neutral-700' />
          {
            errors.email?.message !== undefined && <p className='text-red-600'>{errors.email.message}</p>
          }
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your password</label>
          <input {...register('password')} name='password' type='password' className='p-2 border-b border-neutral-700' />
          {
            errors.password?.message !== undefined && <p className='text-red-600'>{errors.password.message}</p>
          }
        </div>
      </div>
      <div className=''>
        <Button variant='filled' type='submit'>Sign In</Button>
      </div>
    </form>
  )
}
