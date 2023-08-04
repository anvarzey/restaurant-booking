import { ReactElement } from 'react'

export default function page (): ReactElement {
  return (
    <div className='flex items-center justify-center gap-6'>
      <h2 className='text-4xl'>You don't have permissions to access this page</h2>
      <h3 className='text-2xl'>Error 403: Forbidden</h3>
    </div>
  )
}
