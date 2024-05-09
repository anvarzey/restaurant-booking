import './globals.css'
import type { Metadata } from 'next'
import { ReactElement } from 'react'
import Providers from '~/lib/providers'
import { inter } from '~/utils/fonts'

export const metadata: Metadata = {
  title: 'Restaurant Booking',
  description: 'Make your order and reserve your table!'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <html lang='en'>
      <body className={`bg-neutral-100 overflow-x-hidden ${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
