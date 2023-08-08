import { ReactElement } from 'react'

export default function Skeleton (): ReactElement {
  return (
    <li className='bg-white rounded-2xl px-4 py-4 border border-neutral-300 animate-pulse text-transparent' aria-label='Loading'>
      <div className='bg-neutral-300 rounded-xl content-[""] h-1/2' />
      Loading
      <div className='flex flex-col gap-3'>
        <div className='bg-neutral-300 rounded-xl content-[""] h-5 w-1/2' />
        <div className='flex items-center justify-between mt-2'>
          <div className='bg-neutral-300 rounded-xl content-[""] h-4 w-1/3' />
          <div className='bg-neutral-300 rounded-xl content-[""] h-4 w-1/3' />
        </div>
        <div className='flex items-center justify-between mt-2'>
          <div className='bg-neutral-300 rounded-xl content-[""] h-4 w-1/4' />
          <div className='bg-neutral-300 rounded-xl content-[""] h-4 w-2/4' />
        </div>
        <div className='flex items-center justify-between gap-3 mt-4'>
          <div className='bg-neutral-300 rounded-s-xl content-[""] h-8 w-1/4' />
          <div className='bg-neutral-300 rounded-e-xl content-[""] h-8 w-3/4' />
        </div>
      </div>
    </li>
  )
}
