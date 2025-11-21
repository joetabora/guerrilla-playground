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
│   ├── layout.tsx         # Root layout with Header/Footer/LiveCreatorBar
│   ├── page.tsx           # Home page
│   ├── work/              # Case studies listing
│   │   └── [slug]/        # Dynamic case study pages
│   ├── admin/             # Admin routes (dev-only)
│   │   └── preview/       # Case studies & activity editor
│   ├── services/          # Services page
│   ├── creators/          # Creator signup page with CreatorCards
│   ├── brands/            # Brand pitch page
│   ├── contact/           # Contact form page
│   ├── about/             # About/team page
│   ├── actions/           # Server actions
│   └── globals.css        # Global styles
├── data/                  # JSON data files
│   ├── case-studies.json  # Case study content
│   └── activity.json      # Live activity feed data
├── components/
│   ├── CreatorCard.tsx    # Interactive flip card component
│   ├── LiveCreatorBar.tsx # Marquee activity feed
│   ├── MiniPlayer.tsx     # Sticky video player
│   └── ...                # Other components
├── lib/
│   ├── case-studies.ts    # Case study utilities
│   └── activity.ts        # Activity feed utilities
└── scripts/
    └── pushActivity.js    # CLI script to add activities
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

## 📝 Content Management (Phase 1)

### Adding Case Studies

Case studies are now data-driven from `/data/case-studies.json`. To add a new case study:

1. **Edit the JSON file directly:**
   ```bash
   # Open data/case-studies.json
   # Add a new case study object with:
   # - id, title, brand, description, slug
   # - thumbnail (image URL)
   # - metrics array
   # - content object (challenge, solution, results, creators, highlights)
   ```

2. **Or use the Admin Preview:**
   - Visit `/admin/preview` in your browser
   - Edit the Case Studies JSON editor
   - Click "Save Case Studies"

3. **Case study structure:**
   ```json
   {
     "id": "unique-id",
     "title": "Case Study Title",
     "brand": "Brand Name",
     "description": "Brief description",
     "slug": "url-friendly-slug",
     "thumbnail": "/images/case-1.jpg",
     "published": true,
     "date": "2024-01-15",
     "category": "Fashion",
     "metrics": [
       { "label": "Impressions", "value": "5.2M", "change": "320%" }
     ],
     "content": {
       "challenge": "...",
       "solution": "...",
       "results": "...",
       "creators": ["@creator1", "@creator2"],
       "highlights": ["Highlight 1", "Highlight 2"]
     }
   }
   ```

4. **View case study:**
   - Case studies automatically appear on `/work`
   - Individual pages are at `/work/[slug]`

### Adding Creator Cards

Creator cards are displayed on the `/creators` page. To add creators:

1. **Edit `app/creators/page.tsx`:**
   ```typescript
   const featuredCreators = [
     {
       id: '1',
       handle: 'creator_handle',
       avatar: '/images/creators/creator-1.svg',
       niche: 'Fashion',
       stat: '250K',
       statLabel: 'Followers',
       videoPreview: '/videos/creator-preview.webm', // Optional
       profileUrl: '/creators',
       bookUrl: '/contact'
     }
   ];
   ```

2. **Add creator assets:**
   - Place avatar images in `/public/images/creators/`
   - Add video previews (webm/mp4) for flip card back side

### Adding Activity Events

The live creator bar shows real-time activity. To add events:

1. **Using the CLI script:**
   ```bash
   node scripts/pushActivity.js "New creator joined" creator 🎬
   node scripts/pushActivity.js "Campaign launched" campaign 🚀
   node scripts/pushActivity.js "Milestone reached" achievement 🎉
   ```

2. **Or edit JSON directly:**
   - Edit `/data/activity.json`
   - Add new event objects with: id, type, message, timestamp, icon

3. **Or use Admin Preview:**
   - Visit `/admin/preview`
   - Edit Activity Feed JSON editor
   - Click "Save Activities"

### Updating Featured Reels

Edit `app/page.tsx` and update the `featuredReels` array:

```typescript
const featuredReels = [
  {
    id: '1',
    thumbnail: '/images/reels/reel-1.svg',
    title: 'Campaign Title',
    brand: 'Brand Name',
    videoUrl: '/videos/reel-1.mp4', // Optional - for MiniPlayer
    views: '2.5M',
    engagement: '15%'
  }
];
```

**MiniPlayer Features:**
- Click any reel thumbnail to open MiniPlayer (bottom-left)
- MiniPlayer autoplays muted video
- Hover to pause video
- Close button to dismiss
- Preloads thumbnails, lazy-loads full video assets

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

## 🎯 Phase 2 Features

### Brief Builder

Create detailed project briefs with a multi-step form that generates PDFs and saves to JSON.

**Route:** `/brief-builder`

**Features:**
- 5-step guided form (Brand Info → Goals → Deliverables → Budget → Timeline)
- PDF generation on submit
- Saves to `/data/briefs.json`
- Email stub (logs to console)
- Confetti animation on success

**Testing:**
1. Visit `/brief-builder`
2. Complete all 5 steps
3. Submit the form
4. PDF will download automatically
5. Check console for email stub log
6. Check `/data/briefs.json` for saved brief

### Creator Personality Quiz

Take a personality quiz to discover your creator type and earn a badge.

**Route:** `/creator-quiz`

**Features:**
- 8 personality questions
- 5 badge types: Visionary, Trendsetter, Maverick, Connector, Storyteller
- Badge saved to `/data/creator-badges.json`
- Animated result card with confetti

**Testing:**
1. Visit `/creator-quiz`
2. Answer all 8 questions
3. View your badge result
4. Check `/data/creator-badges.json` for saved badge

**Badge Types:**
- **The Visionary** ✨ - Sees possibilities others don't
- **The Trendsetter** 🔥 - Always ahead of the curve
- **The Maverick** ⚡ - Breaks rules and creates own path
- **The Connector** 🤝 - Builds bridges and communities
- **The Storyteller** 📖 - Weaves narratives that move people

### Trends Radar

Visualize trending topics across creator categories with an interactive radial heatmap.

**Route:** `/trends-radar`

**Features:**
- SVG-based radial visualization
- 4 categories: Beauty, Lifestyle, Gaming, Tech
- Animated trend sectors
- Color-coded intensity (Magenta = High, Lime = Medium, Cyan = Low)
- Switch between categories

**Testing:**
1. Visit `/trends-radar`
2. Click category buttons to switch views
3. Watch trend sectors animate on load
4. View intensity percentages

**Adding Trends:**
Edit `/data/trends.json` and add trend objects:
```json
{
  "name": "Trend Name",
  "intensity": 85,
  "angle": 45
}
```

### Global UI Enhancements

**Parallax Backgrounds:**
- Subtle parallax effects on hero sections
- No performance impact
- Smooth animations

**Micro-interactions:**
- Ripple effects on buttons (use `RippleButton` component)
- Scroll-based fade reveals (use `ScrollReveal` component)
- Enhanced color tokens with neon-graffiti aesthetic

**Components:**
- `RippleButton` - Adds ripple effect on click
- `ScrollReveal` - Fades in elements on scroll

## 🎬 Phase 3 Features

### AI Creative Concept Generator

Generate AI-powered creative concepts for campaigns with hooks, scripts, and visual directions.

**Route:** `/creative-generator`

**Features:**
- Multi-field form (campaign name, product summary, target audience, mood/tone, CTA, creativity level)
- AI integration with LLM provider (or smart mock fallback)
- 3 concept cards with animated reveal
- Save to brief or export PDF
- Confetti animation on success

**Setup:**
1. Add to `.env`:
   ```
   LLM_PROVIDER_URL=https://api.your-llm-provider.com/v1/chat/completions
   LLM_PROVIDER_KEY=your-api-key-here
   ```
2. If not set, uses smart mock templates (no API needed)

**Testing:**
1. Visit `/creative-generator`
2. Fill out the form
3. Click "Generate Concepts"
4. View 3 animated concept cards
5. Check `/data/concepts.json` for saved concepts
6. Click "Export PDF" to download concept PDF

### Animated Cinematic Case Studies

Full-screen animated player with metric counters and swipeable creative frames.

**Features:**
- Animated metric counters (count up from baseline to result)
- Swipeable creative frames
- Full-screen overlay with smooth animations
- Auto-generate intro frame option

**Testing:**
1. Visit any case study page (e.g., `/work/streetwear-launch`)
2. Click "🎬 Play Cinematic" button
3. Watch metrics animate upward
4. Swipe left/right to navigate frames
5. Click "Generate Animated Intro" for mock intro generation

### Social Mention Visualization

Real-time visualization of social media mentions across platforms.

**Route:** `/social-mentions`

**Features:**
- Particle/timeline canvas visualization
- Platform filters (TikTok, Instagram, Twitter)
- Play/pause and speed controls
- Seed button to add test mentions
- Real-time polling (every 5 seconds)

**Testing:**
1. Visit `/social-mentions`
2. Click "Seed" button to add test mentions
3. Filter by platform using buttons
4. Adjust playback speed with slider
5. View mentions list below visualization
6. Check `/data/mentions.json` for saved mentions

**CLI Script:**
```bash
node scripts/simulateMentions.js
node scripts/simulateMentions.js --count=10
```

### Admin Console

Enhanced admin interface for managing data and seeding content.

**Route:** `/admin/console`

**Features:**
- Seed creative concepts with example prompts
- Seed social mention events
- View all JSON data files
- Quick access to admin preview

**Testing:**
1. Visit `/admin/console`
2. Click "Seed Concepts" to add example concepts
3. Click "Seed Mentions" to add test mentions
4. View JSON data in read-only editors
5. Click "View All Data" to go to admin preview

---

**Built with ❤️ by Guerrilla Social Club**
