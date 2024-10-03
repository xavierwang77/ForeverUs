import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Forever Us',
    description: '显示自2023年10月26日以来经过的时间'
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
      <html lang="zh">
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground py-2">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Forever Us</h1>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-100 py-2">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2024 forever-us. All rights reserved.
          </div>
        </footer>
      </div>
      </body>
      </html>
  )
}