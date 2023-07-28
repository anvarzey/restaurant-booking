'use client'

import type { Session } from 'next-auth'
import { ReactElement } from 'react'

export default function SessionButton ({ session }: { session: Session }): ReactElement {
  const handleClick = (): void => {
    console.log(session)
  }

  return (
    <button onClick={handleClick}>See Session</button>
  )
}
