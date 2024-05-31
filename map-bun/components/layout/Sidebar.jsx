'use client'

import { Package2 } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { SIDENAV_ITEMS } from '@/lib/constants'
import MenuItem from './MenuItem'
import SignIn from '@/components/auth/SignIn'

export default function Sidebar() {
  return (
    <div className='h-full border-r  flex flex-col overflow-y-auto bg-muted/40 shadow-sm'>
      <div className=' p-4 h-[80px] flex items-center justify-center border-b shadow-sm '>
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          Logo
        </Link>
      </div>
      <div className='flex-1  overflow-y-auto p-4  scrollbar-thin scrollbar-track-blue-200 scrollbar-thumb-blue-300'>
        <nav className='grid items-start px-2 text-sm font-medium lg:px-4 space-y-2'>
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />
          })}
        </nav>
      </div>
      <div className='mt-auto p-2'>
        <Card x-chunk='dashboard-02-chunk-0'>
          <CardContent className='p-2'>
            <SignIn />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
