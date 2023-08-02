'use client'

import { ReactElement, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Fetcher, SWRConfig } from 'swr'

export default function Providers ({ children }: { children: ReactNode }): ReactElement {
  const fetcher: Fetcher<string, string> = async (...args) => await fetch(...args).then(async res => await res.json())

  return (
    <SessionProvider>
      <SWRConfig value={{ fetcher }}>
        {children}
      </SWRConfig>
    </SessionProvider>
  )
}
