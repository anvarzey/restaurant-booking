import { ReactElement } from 'react'

export default function Frame ({ children, className }: { children: ReactElement, className?: string }): ReactElement {
  return (
    <div className={`flex flex-col w-3/5 h-full ${className ?? ''}`}>
      <div className='content-[""] border rounded-t-[4rem] h-1/4' />
      <div className='border-x h-1/2 relative'>
        {children}
      </div>
      <div className='content-[""] border rounded-b-[4rem] h-1/4' />
    </div>
  )
}
