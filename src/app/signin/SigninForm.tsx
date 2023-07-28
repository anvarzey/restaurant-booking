'use client'

import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

interface IFormValues {
  email: string
  password: string
}

export default function SigninForm (): ReactElement {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = async (value: IFormValues): Promise<void> => {
    const { email, password } = value

    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    console.log(response.json())
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <div className='flex flex-col'>
        <label htmlFor=''>Enter your email</label>
        <input {...register('email', { required: 'Email must not be empty' })} type='text' />
        {
          errors.email?.message !== undefined && <p className='text-red-600'>{errors.email.message}</p>
        }
      </div>
      <div className='flex flex-col'>
        <label htmlFor=''>Enter your password</label>
        <input {...register('password', { required: 'Password must not be empty' })} type='text' />
        {
          errors.password?.message !== undefined && <p className='text-red-600'>{errors.password.message}</p>
        }
      </div>
      <button className='bg-emerald-600 text-white py-2'>Log in</button>
    </form>
  )
}
