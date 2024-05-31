import { redirect } from 'next/navigation'
import { getUserAuth } from '@/lib/auth/utils'

export default async function SetupLayout({ children }) {
  const { session } = await getUserAuth()
  if (session?.user.role === 'superadmin') {
    redirect(`/dashboard`)
  } else {
    redirect(`/menu`)
  }

  return <>{children}</>
}
