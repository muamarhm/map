import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import QueryClientProviders from '@/components/QueryClientProviders'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Map Coverage',
  description: 'Map Coverage',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProviders>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryClientProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
