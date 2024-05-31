import NextAuthProvider from '@/lib/auth/Provider'
import { Toaster } from '@/components/ui/sonner'
import QueryClientProviders from '@/components/QueryClientProviders'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { ModalProvider } from '@/components/ModalProvider'

export default async function Layout({ children }) {
  return (
    <NextAuthProvider>
      <QueryClientProviders>
        <div className='h-full'>
          <div className='h-[80px] md:pl-72 fixed inset-y-0 w-full z-50'>
            <Navbar />
          </div>
          <div className='hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50 bg-muted/40  border-r'>
            <Sidebar />
          </div>
          <main className='md:pl-72 pt-[80px] h-full '>
            <div className='flex-1 space-y-4 p-2 '>{children}</div>
          </main>
        </div>
      </QueryClientProviders>
      <ModalProvider />

      <Toaster />
    </NextAuthProvider>
  )
}
