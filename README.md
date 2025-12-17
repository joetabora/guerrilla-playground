# Guerrilla Social Club

Guerrilla Social Club is a high-conversion dropshipping storefront built with **Next.js 14 (app router)**, **Tailwind CSS**, and **shadcn-style UI components**.

The brand aesthetic is **punk / urban / neon** on a dark background, tuned for fast Core Web Vitals and SEO dominance from day one.

## Tech stack

- **Next.js 14** with the app router
- **React 18**
- **Tailwind CSS 3**
- **shadcn-style UI components** in `components/ui`
- No database (static product + blog data in `lib/`)

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Deployment

This project is designed to deploy seamlessly on **Vercel**:

1. Push this repo to GitHub
2. Create a new Vercel project from the repo
3. Set environment variables from `.env.example` as needed
4. Deploy

## Customization

- Edit products and collections in `lib/products.ts`
- Edit blog content in `lib/blog.ts`
- Update global SEO + brand info in `lib/config/site.ts`
- Tweak theme tokens and colors in `tailwind.config.ts`
