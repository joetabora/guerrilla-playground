/**
 * Root layout - global metadata, fonts, and shared structure
 */
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveCreatorBar from '@/components/LiveCreatorBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Guerrilla Social Club | Creator-Led Creative Agency',
    template: '%s | Guerrilla Social Club'
  },
  description: 'Creator-led creative that actually moves culture. We build brands that Gen Z and Millennials actually want to follow.',
  keywords: ['influencer marketing', 'creator marketing', 'social media', 'UGC', 'content creation'],
  authors: [{ name: 'Guerrilla Social Club' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guerrillasocialclub.com',
    siteName: 'Guerrilla Social Club',
    title: 'Guerrilla Social Club | Creator-Led Creative Agency',
    description: 'Creator-led creative that actually moves culture.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Guerrilla Social Club'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guerrilla Social Club | Creator-Led Creative Agency',
    description: 'Creator-led creative that actually moves culture.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-charcoal">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <LiveCreatorBar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
