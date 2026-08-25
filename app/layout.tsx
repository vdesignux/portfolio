import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: {
    default: 'Vaibhavi Patankar — Product Designer',
    template: '%s · Vaibhavi Patankar',
  },
  description:
    'Systems-driven product designer specialising in workflow architecture, information architecture, and AI-integrated design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
