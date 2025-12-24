'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-serif italic text-gradient group-hover:glow transition-all">
            GSC
          </span>
          <span className="text-sm font-mono text-muted-foreground hidden md:inline">
            // Guerrilla Social Club
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <button className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block mr-2" />
            <span className="hidden md:inline">AI ACTIVE</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
