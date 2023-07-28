'use client'

import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

interface IFormValues {
  name: string
  email: string
  password: string
}

export default function SignupForm (): ReactElement {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const onSubmit = async (value: IFormValues): Promise<void> => {
    const { name, email, password } = value

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    console.log(response.json())
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
      <div className='flex flex-col'>
        <label htmlFor=''>Enter your name</label>
        <input {...register('name', { required: 'Name must not be empty' })} type='text' />
        {
          errors.name?.message !== undefined && <p className='text-red-600'>{errors.name.message}</p>
        }
      </div>
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
      <button className='bg-emerald-600 text-white py-2'>Register</button>
    </form>
  )
}
