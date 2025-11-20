/**
 * Root layout that defines global metadata, fonts, and shared chrome for every page.
 */
import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { buildMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = buildMetadata();

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" className="bg-charcoal">
    <body className={`${inter.variable} flex min-h-screen flex-col bg-charcoal text-white`}>
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-charcoal via-ink to-charcoal">
        {children}
      </main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
