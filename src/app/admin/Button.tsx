'use client'

import { ReactElement } from 'react'

export default function Button (): ReactElement {
  const createMonday = async (): Promise<void> => { await fetch('/api/day').then(() => console.log('Called accepted')) }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <button className='bg-emerald-500 text-white px-3 py-1 text-lg rounded-lg' onClick={createMonday}>
      Add Menu
    </button>
  )
}
