import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../database/knex'

async function getProfileByEmail(email) {
  return await db('users')
    .select('*')
    .where('email', email)
    .where('isActive', true)
    .first()
}

export const authOptions = {
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = 1
      session.user.role = 'superadmin'
      return session
    },
    async signIn({ user }) {
      const existingUser = await getProfileByEmail(user.email)
      if (!existingUser) {
        return false
      }
      return true
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
}

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions)
  return { session }
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  if (!session) redirect('/sign-in')
}

export const onlyRole = async (type) => {
  const { session } = await getUserAuth()
  if (!session) redirect('/sign-in')
  if (type === 'superadmin' && session?.user.role !== type) {
    redirect(`/menu`)
  }

  if (type !== 'superadmin' && session?.user.role === type) {
    redirect(`/dashboard`)
  }
}
