import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import '../styles/animations.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Rimigo - Your Dream Vacation Starts Here',
  description: 'Plan your perfect vacation with Rimigo. Flights, stays, tours, visa assistance, and personalized itineraries all in one platform.',
  icons: {
    icon: [
      {
        url: '/favicon-16x16.svg?v=3',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
      {
        url: '/rimigo-icon.svg?v=3',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico?v=3',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.svg?v=3',
        sizes: '180x180',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.ico?v=3',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon-16x16.svg?v=3" sizes="16x16" />
        <link rel="icon" type="image/svg+xml" href="/rimigo-icon.svg?v=3" sizes="32x32" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
