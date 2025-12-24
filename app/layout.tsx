import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/config/site'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { SiteHeader } from '@/components/site-header'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
  }),
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased grain min-h-screen">
        <SiteHeader />
        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
