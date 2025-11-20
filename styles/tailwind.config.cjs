/**
 * Tailwind Design System for Guerrilla Social Club (Option D).
 * Edgy streetwear aesthetic with bold accent colors.
 */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1a1a',
        ink: '#0f0f0f',
        magenta: '#FF2D95',
        lime: '#A6FF00',
        cyan: '#00FFD6',
        white: '#FFFFFF'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'magenta-gradient': 'linear-gradient(135deg, #FF2D95 0%, #FF6BC4 100%)',
        'lime-gradient': 'linear-gradient(135deg, #A6FF00 0%, #D4FF66 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00FFD6 0%, #66FFF0 100%)',
        'grain': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")'
      },
      boxShadow: {
        'glow-magenta': '0 0 30px rgba(255, 45, 149, 0.5)',
        'glow-lime': '0 0 30px rgba(166, 255, 0, 0.5)',
        'glow-cyan': '0 0 30px rgba(0, 255, 214, 0.5)',
        'sticker': '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'tilt': 'tilt 10s infinite linear'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' }
        }
      }
    }
  },
  plugins: []
};
