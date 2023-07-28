'use client'

import { ReactElement } from 'react'
import { signOut } from 'next-auth/react'

export default function SignOutButton (): ReactElement {
  const handleClick = async (): Promise<void> => {
    await signOut()
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <button onClick={handleClick}>SignOutButton</button>
  )
}
