'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

export default function SignInPage() {
  const now = new Date()

  function onSubmit(provider) {
    signIn(provider, { redirect: false, callbackUrl: '/dashboard' })
  }

  return (
    <div className='h-full flex items-center bg-[url("/map-icon/bg-sample.jpg")] bg-cover bg-center bg-no-repeat'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-4'>
          <Button className='w-full' onClick={() => onSubmit('google')}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
