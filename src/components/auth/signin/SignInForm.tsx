'use client'

import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Button from '~/components/shared/Button'
import Spinner from '~/components/shared/Spinner'
import useSignIn from '~/hooks/useSignIn'

export default function SignInForm (): ReactElement {
  const { error, isLoading, handleSignIn } = useSignIn()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: FieldValues): Promise<void> => {
    const { email, password } = values

    const url = await handleSignIn({ email, password })

    if (url) {
      router.push(url)
    }

    /*
      From SignIn Button => http://localhost:3000/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
      From Middleware => destination url
      Error {
        error: CredentialsSignin
        url: null
      }
    */
  }

  return (
    <>
      {
        isLoading
          ? (
            <div className='grow flex items-center justify-center'>
              <Spinner />
            </div>)
          : (
            <>
              {
                error && (
                  <div className='text-red-600 text-center font-semibold pt-2'>
                    {error === 'CredentialsSignin' ? 'Email or password is incorrect' : 'Error when trying to log in'}
                  </div>)
              }
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
            </>)
      }
    </>
  )
}
