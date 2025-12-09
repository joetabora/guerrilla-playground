# Guerrilla Social Club

**Gaming. Harleys. Filth. One crew.**

A single-page digital punk clubhouse fusing "Such Grime" gaming persona with "Joe's Used Harleys" business. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

**Toxico.co.uk aesthetic:** Black backgrounds, neon cyan/orange accents, distressed textures, urban grit, insane energy.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd guerrilla-playground

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
guerrilla-playground/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Single-page site
│   └── globals.css        # Global styles (Toxico aesthetic)
├── components/
│   ├── HeroSection.tsx           # Full-screen hero with split background
│   ├── LiveStreamSection.tsx     # Twitch/Kick embed with countdown
│   ├── TheClubSection.tsx        # Discord invite + member count
│   ├── JoesHarleysSection.tsx     # Harley inventory grid
│   ├── ContentGridSection.tsx    # Gaming clips + Harley vlogs
│   ├── SocialsGridSection.tsx    # Social media icons
│   ├── NewsletterSignupSection.tsx # Email + SMS signup
│   └── Footer.tsx                # Footer
├── public/                # Static assets
└── styles/
    └── tailwind.config.cjs # Tailwind configuration
```

## 🎨 Design System

### Colors
- **Neon Cyan:** `#00FFFF` - Primary accent
- **Neon Orange:** `#FF6600` - Secondary accent
- **Toxic Black:** `#000000` - Background
- **Distressed Gray:** `#1a1a1a` - Secondary background

### Typography
- System fonts with bold, black weights
- Kinetic typography with letter-level animations
- Tight letter spacing for edgy look

## 📝 Sections

1. **Hero** - Full-screen split background (gaming left, Harley right) with blended logo
2. **Live Stream** - Twitch/Kick embed with countdown timer
3. **The Club** - Discord invite, live member count, Filth Fam shoutouts
4. **Joe's Used Harleys** - Inventory grid with $499 shipping banner, floating "Text Joe" button
5. **Content Grid** - Best gaming clips + Harley vlogs
6. **Socials Grid** - Huge clickable icons for all platforms
7. **Newsletter Signup** - Email + SMS signup form

## 🖼️ Image Assets

All images should be hosted on `catbox.moe` with permanent URLs. Update these in the components:

- `guerrilla-logo.png` - Blended logo (Toxico skull + Harley bar-and-shield)
- `placeholder-gaming.jpg` - Gaming clips background
- `placeholder-harley.jpg` - Harley footage background
- `harley-*.jpg` - Inventory images
- `gaming-clip-*.jpg` - Gaming content thumbnails
- `harley-vlog-*.jpg` - Harley vlog thumbnails
- `grain-texture.png` - Distressed texture overlay

## 🔧 Configuration

### Next.js Config
- External images from `files.catbox.moe` are allowed
- Optimized for Vercel deployment

### Environment Variables
No environment variables required for basic functionality. Add these for enhanced features:
- `DISCORD_WEBHOOK_URL` - For Discord member count (optional)
- `NEWSLETTER_API_KEY` - For newsletter signup (optional)
- `SMS_API_KEY` - For SMS alerts (optional)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

The site is optimized for Vercel and will deploy automatically on push to main.

## 📱 Mobile-First

The site is fully responsive and mobile-optimized. All sections adapt beautifully to mobile screens.

## 🎯 Features

- **Single-page design** - Smooth scrolling between sections
- **Toxico aesthetic** - Punk/goth/hip-hop/tattoo art style
- **Fast performance** - Optimized images and lazy loading
- **Accessible** - ARIA labels and keyboard navigation
- **Animated** - Framer Motion animations throughout

## 📄 License

Private project - All rights reserved.
