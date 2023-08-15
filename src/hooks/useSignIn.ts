'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

interface IReturn {
  error: string | null
  handleSignIn: ({ email, password }: { email: string, password: string }) => Promise<string | null>
  isLoading: boolean
}

export default function useSignIn (): IReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async ({ email, password }: { email: string, password: string }): Promise<string | null> => {
    setIsLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    const url = new URL(res?.url ?? 'http://localhost:3000')
    // console.log('Sign In Response => ', url)
    // const callbackRegex = /\?callbackUrl=/
    console.log('Response => ', res)
    setIsLoading(false)
    if (res !== undefined) {
      if (!res.url) {
        setError(res.error as string)
        return null
      }
      if (!url.search.length) {
        return url.href
      } else {
      // if (url.search.match(callbackRegex)) {
        //   const callbackUrl = url.search.split('=')[1].replaceAll('%3A', ':').replaceAll('%2F', '/')
        //   router.push(callbackUrl)
        // } else {
        //   router.push('/')
        // }
        return '/'
      }
    }
    return null
  }

  return {
    error,
    handleSignIn,
    isLoading
  }
}
