# Guerrilla Social Club

**Creator-led creative that actually moves culture.**

A high-energy, trend-setting influencer marketing agency website with a Social Creator Culture / Edgy Streetwear aesthetic. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

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
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page
│   ├── work/              # Case studies page
│   ├── services/          # Services page
│   ├── creators/          # Creator signup page
│   ├── brands/            # Brand pitch page
│   ├── contact/           # Contact form page
│   ├── about/             # About/team page
│   ├── actions/           # Server actions
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Sticky navigation
│   ├── Footer.tsx         # Site footer
│   ├── HeroKinetic.tsx    # Kinetic typography hero
│   ├── ReelGrid.tsx       # Auto-play reel grid
│   ├── CaseStudyCard.tsx  # Case study cards
│   ├── ContactForm.tsx    # Contact form with confetti
│   ├── CreatorSignupForm.tsx # Creator signup form
│   ├── Sticker.tsx        # Sticker component
│   ├── MicroInteractions.tsx # Hover/tilt utilities
│   └── AnimatedGradientOrb.tsx # Animated gradient orb
├── lib/                   # Utilities
│   ├── seo.ts            # SEO metadata helpers
│   ├── email.ts          # Email sending (stub)
│   └── analytics.ts      # Analytics (stub)
├── public/                # Static assets
│   ├── brand-logo.svg    # Logo (replace with actual)
│   ├── favicon.ico       # Favicon (replace)
│   └── images/           # Image assets
└── styles/               # Tailwind config
    └── tailwind.config.cjs
```

## 🎨 Design System

### Colors

- **Charcoal**: `#1a1a1a` (background)
- **Ink**: `#0f0f0f` (darker surfaces)
- **Magenta**: `#FF2D95` (primary accent)
- **Lime**: `#A6FF00` (secondary accent)
- **Cyan**: `#00FFD6` (tertiary accent)
- **White**: `#FFFFFF` (text)

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, uppercase, tight tracking
- **Kinetic Typography**: Letter-level animations on hero

### Components

- **Stickers**: Rotated, clipped-path elements with shadows
- **Tilt Cards**: 3D hover effects
- **Gradient Orbs**: Animated background elements
- **Confetti**: Canvas confetti on form success

## 🚢 Deployment on Vercel

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `guerrilla-playground` repository

### Step 2: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
SENDGRID_API_KEY=your_sendgrid_api_key (optional, for email)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 3: Deploy

1. Vercel will auto-detect Next.js
2. Click "Deploy"
3. Your site will be live at `yourproject.vercel.app`

### Step 4: Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 📝 Content Management

### Updating Case Studies

Edit `app/work/page.tsx` and update the `caseStudies` array:

```typescript
const caseStudies = [
  {
    id: 'your-case-study',
    title: 'Your Title',
    brand: 'Brand Name',
    description: 'Description...',
    thumbnail: '/images/case-1.jpg',
    metrics: [...],
    // ...
  }
];
```

### Updating Featured Reels

Edit `app/page.tsx` and update the `featuredReels` array:

```typescript
const featuredReels = [
  {
    id: '1',
    thumbnail: '/images/reel-1.jpg',
    title: 'Campaign Title',
    brand: 'Brand Name',
    views: '2.5M',
    engagement: '15%'
  }
];
```

### Updating Team

Edit `app/about/page.tsx` and update the `team` array.

## 🖼️ Assets & Branding

### Logo

**Current**: Placeholder SVG at `/public/brand-logo.svg`

**To Replace**: 
1. Replace `/public/brand-logo.svg` with your actual logo
2. Or update the Image src in `components/Header.tsx` and `components/Footer.tsx` to point to `/brand-logo.png`

**Note**: The original logo file should be at `/mnt/data/A_flat,_vector_graphic_icon_features_a_stylized_ga.png` - copy this to `/public/brand-logo.png` or convert to SVG.

### Images

Replace placeholder images in `/public/images/`:

- `reel-1.jpg` through `reel-6.jpg` - Reel thumbnails (9:16 aspect ratio)
- `case-1.jpg`, `case-2.jpg`, `case-3.jpg` - Case study images
- `case-1-before.jpg`, `case-1-after.jpg` - Before/after images
- `team-1.jpg` through `team-4.jpg` - Team member photos (square)

### Favicon

Replace `/public/favicon.ico` with your actual favicon.

### Open Graph Image

Create `/public/og-image.png` (1200x630px) for social sharing.

## 🔧 Configuration

### Email Setup

1. Edit `lib/email.ts`
2. Uncomment SendGrid or SMTP configuration
3. Add environment variables:
   - `SENDGRID_API_KEY` (for SendGrid)
   - Or SMTP credentials

### Analytics

1. Edit `lib/analytics.ts`
2. Add your analytics provider (Google Analytics, Plausible, etc.)
3. Add `NEXT_PUBLIC_GA_ID` to environment variables if using GA

## 🎯 Features

- ✅ Kinetic typography with letter-level animations
- ✅ Auto-play reel grid with hover-to-pause
- ✅ 3D tilt card interactions
- ✅ Confetti on form success
- ✅ Sticker-style UI elements
- ✅ Animated gradient orbs
- ✅ Mobile-first responsive design
- ✅ SEO optimized with metadata
- ✅ Accessibility features (ARIA labels, focus states)
- ✅ Server actions for form handling
- ✅ Image optimization with next/image

## 🐛 Troubleshooting

### Build Errors

If you see TypeScript errors:
```bash
npm run build
```

Check for:
- Missing image files (replace placeholders)
- Type errors in components
- Missing environment variables (optional)

### Images Not Loading

- Ensure images are in `/public/images/`
- Use correct paths (e.g., `/images/reel-1.jpg`)
- Check file extensions match

### Confetti Not Working

- Ensure `canvas-confetti` is installed: `npm install canvas-confetti`
- Check browser console for errors

## 📚 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Server Actions
- **Confetti**: canvas-confetti
- **Deployment**: Vercel

## 📄 License

Private - All rights reserved

## 🤝 Support

For questions or issues, contact the development team.

---

**Built with ❤️ by Guerrilla Social Club**
