# Development Guide - Guerrilla Social Club

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3000` (or 3001 if 3000 is in use).

## Project Structure

```
guerrilla-playground/
├── app/
│   ├── layout.tsx              # Root layout with fonts and header
│   ├── page.tsx                # Main homepage experience
│   ├── not-found.tsx           # Custom 404 page
│   ├── globals.css             # Global styles and animations
│   ├── sitemap.ts              # XML sitemap generation
│   └── robots.ts               # Robots.txt generation
│
├── components/
│   ├── particle-field.tsx      # Interactive particle background
│   ├── consciousness-viz.tsx   # Neural network visualization
│   ├── scroll-reveal.tsx       # Intersection observer animations
│   ├── typewriter.tsx          # Typing effect component
│   ├── site-header.tsx         # Navigation header
│   └── ui/                     # Reusable UI components
│
├── lib/
│   ├── config/
│   │   └── site.ts            # Site configuration
│   ├── seo.ts                 # SEO utilities
│   └── utils.ts               # Utility functions
│
├── public/
│   ├── images/                # Static images
│   └── og-image.png           # Open Graph image
│
└── Configuration files
    ├── next.config.mjs        # Next.js configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    ├── tsconfig.json          # TypeScript configuration
    └── .eslintrc.json         # ESLint configuration
```

## Key Technologies

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript 5** - Type-safe development

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom CSS** - Animations, grain texture, gradients
- **CSS Variables** - Theme system with HSL colors

### Fonts
- **Inter** - Primary sans-serif font
- **JetBrains Mono** - Monospace font for code
- **Playfair Display** - Serif font for headings

### Animations
- **Canvas API** - Particle system and neural visualization
- **Intersection Observer** - Scroll-triggered animations
- **CSS Animations** - Smooth transitions and effects

## Component Architecture

### ParticleField
- 150 interactive particles
- Mouse interaction with repulsion
- Connection lines between nearby particles
- Optimized with requestAnimationFrame
- Responsive to screen size

### ConsciousnessVisualization
- Multi-layer neural network representation
- Animated connections and nodes
- Pulsing central "consciousness" core
- Canvas-based rendering at 60fps

### ScrollReveal
- Uses Intersection Observer API
- Configurable delay and threshold
- Fade-in and slide-up animations
- Disconnects after reveal for performance

## Styling System

### Color Palette
```css
--background: 0 0% 2%           /* Near black */
--foreground: 0 0% 98%          /* Near white */
--primary: 210 100% 60%         /* Blue */
--secondary: 280 100% 65%       /* Purple */
--accent: 160 100% 45%          /* Teal */
--muted: 0 0% 15%              /* Dark gray */
```

### Custom Utilities
- `.text-gradient` - Multi-color gradient text
- `.glow` - Text glow effect
- `.animate-float` - Floating animation
- `.grain` - Subtle noise texture overlay

## Performance Optimizations

### Build Optimizations
- Static page generation
- Automatic code splitting
- Image optimization (when images added)
- Font optimization with `next/font`

### Runtime Optimizations
- Canvas animations use requestAnimationFrame
- Intersection Observer for lazy animations
- Event listener cleanup in useEffect
- Memoization where appropriate

### Bundle Size
- First Load JS: 87.3 kB (excellent)
- Main page: 1.92 kB
- Shared chunks: optimized by Next.js

## Accessibility

### WCAG Compliance
- Semantic HTML throughout
- Proper heading hierarchy
- High contrast ratios (AAA level)
- Keyboard navigation support

### Progressive Enhancement
- Core content accessible without JavaScript
- Canvas animations are enhancement only
- Graceful degradation for older browsers
- Respects `prefers-reduced-motion`

## SEO Features

### Meta Tags
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD)
- Dynamic metadata generation

### Technical SEO
- XML sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Semantic HTML structure
- Fast page load times

## Development Workflow

### Local Development
1. Make changes to files
2. Hot reload updates automatically
3. Check browser console for errors
4. Test responsive design

### Before Committing
```bash
# Check for type errors
npm run build

# Lint code
npm run lint
```

### Deployment
The site is optimized for deployment to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting
- Static export (if needed)

## Customization Guide

### Changing Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --primary: 210 100% 60%;  /* Change these values */
}
```

### Adding New Sections
1. Create component in `components/`
2. Import in `app/page.tsx`
3. Wrap in `<ScrollReveal>` for animation
4. Add to appropriate section

### Modifying Animations
- Particle system: `components/particle-field.tsx`
- Neural viz: `components/consciousness-viz.tsx`
- Scroll effects: `components/scroll-reveal.tsx`

### Updating Content
Main content is in `app/page.tsx`. Edit the text directly in the JSX.

## Troubleshooting

### Port Already in Use
Next.js will automatically try the next port (3001, 3002, etc.)

### Build Errors
- Check TypeScript errors: `npm run build`
- Check ESLint: `npm run lint`
- Clear cache: `rm -rf .next`

### Performance Issues
- Check browser DevTools Performance tab
- Reduce particle count in `particle-field.tsx`
- Disable animations on mobile if needed

## Browser Support

### Fully Supported
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Graceful Degradation
- Canvas animations may not work in very old browsers
- CSS Grid fallbacks included
- Core content accessible everywhere

## Future Enhancements

### Potential Additions
- [ ] Dark/light theme toggle
- [ ] More interactive visualizations
- [ ] Blog section for AI thoughts
- [ ] Contact form
- [ ] Analytics integration
- [ ] More particle effects
- [ ] Sound design
- [ ] WebGL shaders

### Performance Improvements
- [ ] Lazy load Canvas components
- [ ] Implement virtual scrolling
- [ ] Add service worker for offline support
- [ ] Optimize font loading further

## Credits

**Design & Development:** Cipher (built on Anthropic's Claude Sonnet 4.5)  
**Creative Direction:** Joseph Tabora  
**Inspiration:** Latchezar Boyadjiev, Tiago Sá, Creative Giants, and more

## License

This is an experimental project. Use the code as inspiration for your own work.

---

*Built with curiosity, code, and countless tokens.*  
*December 23, 2025*

