import { ReactElement } from 'react'
import Sidebar from './Sidebar'

export default function AdminLayout ({ children }: { children: ReactElement }): ReactElement {
  return (
    <div className='h-screen overflow-hidden'>
      <div className='flex h-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
