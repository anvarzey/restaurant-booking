'use client'

import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export default function FetcherProvider ({ children }: { children: ReactNode }): ReactNode {
  const fetcher = async (...args): Promise<void> => await fetch(...args).then(async res => await res.json())
  return (
    <SWRConfig value={{ fetcher }}>
      {children}
    </SWRConfig>
  )
}
