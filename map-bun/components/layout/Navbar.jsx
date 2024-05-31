import React from 'react'
import { UserMenu } from './UserMenu'
import MobileSidebar from './MobileSidebar'

export default async function Navbar({}) {
  return (
    <div className='sticky top-0 z-30 p-4 border-b bg-muted/40 h-full flex items-center  shadow-sm'>
      <MobileSidebar />
      <div className='flex gap-x-2 ml-auto justify-center items-center'>
        <UserMenu />
      </div>
    </div>
  )
}
