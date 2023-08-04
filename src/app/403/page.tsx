import { ReactElement } from 'react'
import Button from '~/components/Button'

export default function page (): ReactElement {
  return (
    <div className='flex flex-col items-center justify-center gap-6 h-screen'>
      <h2 className='text-2xl font-semibold'>You don't have permissions to access this page</h2>
      <h3 className='text-xl italic'>Error 403: Forbidden</h3>
      <div><Button variant='outline' link href='/'>Return to Home</Button></div>
    </div>
  )
}
