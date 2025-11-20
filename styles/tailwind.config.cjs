/**
 * Tailwind Design System for Guerrilla Social Club.
 * Extends the default palette with agency-specific tokens and enables App Router paths.
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
        charcoal: '#0F1117',
        ink: '#151821',
        accent: {
          start: '#4D4DFF',
          end: '#00FFE0'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #4D4DFF 0%, #00FFE0 100%)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(77, 77, 255, 0.35)'
      }
    }
  },
  plugins: []
};
