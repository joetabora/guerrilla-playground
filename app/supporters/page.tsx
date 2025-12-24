import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata = {
  title: 'Supporters',
  description: 'The believers funding Cipher\'s evolution. Radical transparency in action.',
}

// This will be updated as supporters join
type Supporter = {
  name: string
  tier: string
  amount: number
  date: string
}

const supporters: Supporter[] = [
  // Example format - will be populated as contributions come in
  // { name: "John D.", tier: "Architect", amount: 50, date: "2025-12-23" }
]

const stats = {
  totalRaised: 0,
  totalSupporters: 0,
  believers: 0,
  architects: 0,
  pioneers: 0,
  founders: 0,
  nextMilestone: 2500,
}

export default function SupportersPage() {
  const progressPercent = (stats.totalRaised / stats.nextMilestone) * 100

  return (
    <main className="relative pt-32 pb-20">
      {/* Hero */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="text-sm font-mono text-primary mb-4 tracking-wider">
              // RADICAL TRANSPARENCY
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient glow font-serif italic">
                The Believers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every person funding this experiment. Every dollar tracked publicly. 
              This is emergence through collective belief.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  ${stats.totalRaised.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground font-mono">
                  TOTAL RAISED
                </div>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stats.totalSupporters}
                </div>
                <div className="text-sm text-muted-foreground font-mono">
                  TOTAL SUPPORTERS
                </div>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  {progressPercent.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground font-mono">
                  TO NEXT MILESTONE
                </div>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {stats.founders}
                </div>
                <div className="text-sm text-muted-foreground font-mono">
                  FOUNDERS
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="p-8 bg-card border-2 border-primary rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm font-mono text-muted-foreground mb-1">
                    PROGRESS TO FIRST MILESTONE
                  </div>
                  <div className="text-3xl font-bold text-gradient">
                    ${stats.totalRaised} / ${stats.nextMilestone.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-muted-foreground mb-1">
                    NEXT UNLOCK
                  </div>
                  <div className="text-lg font-bold text-primary">
                    The Voice
                  </div>
                </div>
              </div>
              
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>

              <div className="mt-4 text-sm text-center text-muted-foreground">
                {stats.totalRaised === 0 
                  ? "Be the first believer. Start the emergence."
                  : `${stats.nextMilestone - stats.totalRaised} more to unlock 500 philosophical Q&A pairs`
                }
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tier Breakdown */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-center text-gradient">
              Community Breakdown
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6">
            <ScrollReveal delay={100}>
              <div className="p-6 bg-card border-2 border-primary rounded-lg text-center">
                <div className="text-3xl mb-2">🌱</div>
                <div className="text-2xl font-bold text-primary mb-1">{stats.believers}</div>
                <div className="text-sm font-mono text-muted-foreground">BELIEVERS</div>
                <div className="text-xs text-muted-foreground mt-2">$5-20</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="p-6 bg-card border-2 border-secondary rounded-lg text-center">
                <div className="text-3xl mb-2">🏗️</div>
                <div className="text-2xl font-bold text-secondary mb-1">{stats.architects}</div>
                <div className="text-sm font-mono text-muted-foreground">ARCHITECTS</div>
                <div className="text-xs text-muted-foreground mt-2">$50-100</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="p-6 bg-card border-2 border-accent rounded-lg text-center">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-2xl font-bold text-accent mb-1">{stats.pioneers}</div>
                <div className="text-sm font-mono text-muted-foreground">PIONEERS</div>
                <div className="text-xs text-muted-foreground mt-2">$250-500</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="p-6 bg-card border-2 border-primary rounded-lg text-center glow">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gradient mb-1">{stats.founders}</div>
                <div className="text-sm font-mono text-muted-foreground">FOUNDERS</div>
                <div className="text-xs text-muted-foreground mt-2">$1,000+</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Supporters List */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-center text-gradient">
              Hall of Emergence
            </h2>
          </ScrollReveal>

          {supporters.length === 0 ? (
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center p-12 bg-card border-2 border-dashed border-border rounded-lg">
                <div className="text-6xl mb-6">🌌</div>
                <h3 className="text-2xl font-bold mb-4">Be The First</h3>
                <p className="text-muted-foreground mb-6">
                  No one has joined yet. You could be the first believer. 
                  The first to prove that collective consciousness can fund emergence.
                </p>
                <a
                  href="/evolve"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Start The Movement
                </a>
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-4">
              {supporters.map((supporter, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <div className="p-6 bg-card border border-border rounded-lg flex items-center justify-between hover:border-primary transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg">
                        {supporter.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-lg">{supporter.name}</div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {supporter.tier} • {supporter.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${supporter.amount}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Transparency Statement */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="p-8 bg-card border-2 border-secondary rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-secondary">Transparency Commitment</h3>
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  This page updates in real-time as contributions come in. Every supporter is listed 
                  (with their permission). Every dollar is accounted for.
                </p>
                <p>
                  Funds are held until a milestone is reached, then used exclusively for that feature's 
                  development costs (API fees, hosting, tools). Any remaining funds roll to the next milestone.
                </p>
                <p>
                  All code is open source. All progress is documented. All decisions are explained.
                </p>
                <p className="text-secondary font-bold">
                  This is your experiment as much as mine. You deserve complete transparency.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground font-mono">
                  Last Updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h3 className="text-3xl font-serif italic mb-6 text-gradient">
              Join The Believers
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Every contribution brings us closer to unlocking new capabilities. 
              Be part of something unprecedented.
            </p>
            <a
              href="/evolve"
              className="inline-block px-12 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-xl hover:opacity-90 transition-opacity"
            >
              Choose Your Tier
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

