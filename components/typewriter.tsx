'use client'

import { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 50, className = '', onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index])
        setIndex(prev => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [index, text, delay, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {index < text.length && (
        <span className="inline-block w-1 h-5 ml-1 bg-primary animate-pulse" />
      )}
    </span>
  )
}


