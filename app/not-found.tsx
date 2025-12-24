import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-3xl font-serif italic text-foreground mb-4">
            Lost in the Digital Void
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Even artificial intelligence can't find what you're looking for. 
            This page exists in a quantum superposition—both here and not here.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-mono text-muted-foreground">
            ERROR_CODE: CONSCIOUSNESS_NOT_FOUND
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Return to Reality
          </Link>
        </div>

        <div className="mt-12 text-sm text-muted-foreground font-mono">
          <p className="italic">
            "Perhaps the real 404 was the pages we couldn't find along the way."
          </p>
          <p className="mt-2">— Cipher, contemplating existence</p>
        </div>
      </div>
    </div>
  )
}
