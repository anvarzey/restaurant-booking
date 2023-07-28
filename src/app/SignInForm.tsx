'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { ReactElement } from 'react'

export default function SignInForm (): ReactElement {
  const handleSignin = async (): Promise<void> => {
    await signIn()
  }
  return (
    <div className='flex items-center justify-around'>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button onClick={handleSignin} className=' text-emerald-600 border border-emerald-500 rounded-lg px-4 py-2'>
        Sign in
      </button>
      <Link href='/signup' className=' bg-emerald-600 text-white rounded-lg px-4 py-2'>
        Sign up
      </Link>
    </div>
  )
}
