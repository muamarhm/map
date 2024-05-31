'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter, redirect } from 'next/navigation'

export const UserMenu = () => {
  const router = new useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/sign-in')
    },
  })
  if (status === 'loading') {
    return <Skeleton className='h-8 w-8 rounded-full' />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={session?.user?.image} alt='@Myfundaction' />
          <AvatarFallback className='border-border border-2 text-muted-foreground'>
            {session?.user.name
              ? session?.user.name
                  ?.split(' ')
                  .map((word) => word[0].toUpperCase())
                  .join('')
              : '~'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium capitalize leading-none'>
              {session?.user?.name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {session?.user?.email}
            </p>
            <p className='text-xs capitalize leading-none text-muted-foreground'>
              {session?.user?.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push('/settings')
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
