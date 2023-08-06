'use client'

import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import Button from '~/components/shared/Button'

interface IFormValues {
  name: string
  email: string
  password: string
}

export default function SignupForm (): ReactElement {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const onSubmit = async (value: IFormValues): Promise<void> => {
    const { name, email, password } = value

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    if (res.ok) {
      await router.push('/auth/signin')
    }
    console.log(res)
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='grow flex flex-col justify-around'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your name</label>
          <input {...register('name', { required: 'Name must not be empty' })} type='text' className='p-2 border-b border-neutral-700' />
          {
            errors.name?.message !== undefined && <p className='text-red-600'>{errors.name.message}</p>
          }
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your email</label>
          <input {...register('email', { required: 'Email must not be empty' })} type='text' className='p-2 border-b border-neutral-700' />
          {
            errors.email?.message !== undefined && <p className='text-red-600'>{errors.email.message}</p>
          }
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Enter your password</label>
          <input {...register('password', { required: 'Password must not be empty' })} type='password' className='p-2 border-b border-neutral-700' />
          {
            errors.password?.message !== undefined && <p className='text-red-600'>{errors.password.message}</p>
          }
        </div>
      </div>
      <Button variant='filled' type='submit'>Register</Button>
    </form>
  )
}
