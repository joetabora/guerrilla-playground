# Guerrilla Social Club

A production-ready influencer marketing agency site built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion. Designed for fast iteration, tasteful motion, and Vercel deployment.

## Tech Stack
- Next.js 14 App Router
- TypeScript with strict mode
- Tailwind CSS + custom design tokens
- Framer Motion for micro-interactions
- Server Actions stub for contact form email handling

## Getting Started
1. `cd /workspace`
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Visit `http://localhost:3000`

### Available Scripts
- `npm run dev` – start Next.js in development
- `npm run build` – create a production build
- `npm run start` – serve the production build
- `npm run lint` – run ESLint via `next lint`

## Project Structure
```
app/                # App Router routes, layout, and global styles
components/        # Shared UI with comments for beginners
lib/               # Metadata + email helper stubs
public/images/     # Placeholder SVG assets (replace with brand imagery)
styles/            # Tailwind + PostCSS configuration files
```

## Styling & Theming
- Dark charcoal base with gradient accent (`#4D4DFF → #00FFE0`)
- Inter font applied globally via `next/font`
- Tailwind tokens defined in `styles/tailwind.config.cjs`
- Additional helpers (gradient text, card surfaces) in `app/globals.css`

## Contact Form & Email Provider
The contact form ships with a server action (`app/actions/contact.ts`) that calls the stub in `lib/email.ts`.
- Update `.env.local` using `.env.example`
- Uncomment either the SendGrid or Nodemailer strategy in `lib/email.ts`
- Provide:
  - `SENDGRID_API_KEY` *or* full SMTP credentials (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`)
  - `CONTACT_INBOX` for message recipients

## How to Customize Copy and Images
1. **Copy:** Edit the relevant page in `app/`. Each section is clearly commented and uses simple JSX.
2. **Components:** Update shared UI in `components/` to change CTAs, cards, or layout spacing.
3. **Images:** Replace SVGs in `public/images/` with brand photography or exports. Keep filenames identical or update the `src` paths in components.
4. **Design tokens:** Adjust gradients, spacing, or fonts in `app/globals.css` and `styles/tailwind.config.cjs`.

## Deployment
1. Push this repository to GitHub/GitLab.
2. In Vercel, click **New Project** → import the repo.
3. Set framework preset to **Next.js** (detected automatically).
4. Add environment variables if enabling email (see above).
5. Deploy – Vercel will run `npm install`, `npm run build`, and `npm run start`.

### Deployment Checklist
- [ ] Environment variables added in Vercel dashboard (`SENDGRID_API_KEY` or SMTP fields, `CONTACT_INBOX`).
- [ ] Placeholder images replaced or approved.
- [ ] Content reviewed for accuracy/legal.
- [ ] `npm run build` passes locally.
- [ ] Domain connected in Vercel (optional).

## Updating Content
- Services & case studies: `app/services/page.tsx`, `app/case-studies/page.tsx`
- Creator + brand messaging: `app/creators/page.tsx`, `app/brands/page.tsx`
- Contact CTA + routing: `components/Button.tsx`, `components/Navbar.tsx`

## Deploying to Production
After merging changes to your main branch:
1. Vercel auto-builds and deploys.
2. Monitor build logs for Tailwind or TypeScript errors.
3. Use Vercel Analytics or integrate your preferred analytics solution.

Happy launching!
