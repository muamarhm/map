import { getUserAuth } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }) {
  const session = await getUserAuth()
  if (session?.session) redirect('/map')

  return <div className='h-screen '>{children}</div>
}
